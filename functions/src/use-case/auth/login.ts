import { UserDb } from '../../data-access/types/data-access.type';
import { UnauthorizedError } from '../../utils/errors';
import { requiredParam } from '../../utils/validation-utils';
import { ComparePassword } from '../types/bcrypt.type';
import { calculateAutoLogoutAt, calculateExpiresAt } from '../utils/expires-at';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../utils/token-generator';

export const makeLogin = ({
  userDb,
  comparePassword,
}: {
  userDb: UserDb;
  comparePassword: ComparePassword;
}) => {
  const login = async (
    username: string,
    password: string,
    oldRefreshToken: string | undefined,
  ) => {
    requiredParam(username, 'Username');
    requiredParam(password, 'Password');

    const user = await userDb.isExisting({ username });
    if (!user) {
      throw new UnauthorizedError('Invalid username.');
    }

    if (!comparePassword(password, user.password)) {
      throw new UnauthorizedError('Invalid password.');
    }

    const accessToken = generateAccessToken({
      userId: user._id,
      username: user.username,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      userId: user._id,
      username: user.username,
      role: user.role,
    });

    let newRefreshTokenArray = !oldRefreshToken
      ? user.refreshToken
      : user.refreshToken.filter((rt) => rt.token !== oldRefreshToken);

    if (oldRefreshToken) {
      const foundToken = await userDb.findByToken({
        refreshToken: oldRefreshToken,
      });
      if (!foundToken) {
        newRefreshTokenArray = [];
      }
    }

    const updatedUser = await userDb.updateById(user._id, {
      refreshToken: [
        ...newRefreshTokenArray,
        {
          token: refreshToken,
          expiresAt: calculateExpiresAt(),
          autoLogoutAt: calculateAutoLogoutAt(),
        },
      ],
    });

    const currentDate = new Date();
    const validRefreshTokens = updatedUser.refreshToken.filter(
      (rt) => new Date(rt.expiresAt) > currentDate,
    );

    if (validRefreshTokens.length !== updatedUser.refreshToken.length) {
      await userDb.updateById(user._id, {
        refreshToken: [...validRefreshTokens],
      });
    }

    return { accessToken, refreshToken };
  };
  return login;
};
