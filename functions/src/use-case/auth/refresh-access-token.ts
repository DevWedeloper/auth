import { UserDb } from '../../data-access/types/data-access.type';
import { ForbiddenError, UnauthorizedError } from '../../utils/errors';
import { TokenPayload, VerifyToken } from '../types/jwt.type';
import { calculateExpiresAt } from '../utils/expires-at';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../utils/token-generator';

export const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as string;

export const makeRefreshAccessToken = ({
  userDb,
  verify,
}: {
  userDb: UserDb;
  verify: VerifyToken;
}) => {
  const refreshAccessToken = async (refreshToken: string | undefined) => {
    if (!refreshToken) {
      throw new UnauthorizedError('Refresh token is missing.');
    }

    const user = await userDb.findByToken({ refreshToken });
    if (!user) {
      try {
        const decoded = verify(
          refreshToken,
          refreshTokenSecret
        ) as TokenPayload;
        const hackedUser = await userDb.findOneByUsernameOrId({
          _id: decoded._id,
        });
        await userDb.updateById(hackedUser._id, {
          refreshToken: [],
        });
      } catch (error) {
        throw new UnauthorizedError(error);
      }
      throw new ForbiddenError('Breach detected.');
    }

    const newRefreshTokenArray = user.refreshToken.filter(
      (rt) => rt.token !== refreshToken
    );

    const previousAutoLogoutAtValue = user.refreshToken
      .filter((rt) => rt.token === refreshToken)
      .map((rt) => rt.autoLogoutAt);

    let decoded;
    try {
      decoded = verify(refreshToken, refreshTokenSecret) as TokenPayload;
    } catch (error) {
      await userDb.updateById(user._id, {
        refreshToken: [...newRefreshTokenArray],
      });
      throw new UnauthorizedError(error);
    }

    const accessToken = generateAccessToken({
      userId: decoded.userId,
      username: decoded.username,
      role: decoded.role,
    });

    const newRefreshToken = generateRefreshToken({
      userId: decoded.userId,
      username: decoded.username,
      role: decoded.role,
    });

    await userDb.updateById(user._id, {
      refreshToken: [
        ...newRefreshTokenArray,
        {
          token: newRefreshToken,
          expiresAt: calculateExpiresAt(),
          autoLogoutAt: previousAutoLogoutAtValue[0],
        },
      ],
    });

    return { accessToken, refreshToken };
  };
  return refreshAccessToken;
};
