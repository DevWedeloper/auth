import { OAuth2Client } from 'google-auth-library';
import { UserDb } from '../../data-access/types/data-access.type';
import { InvalidOperationError, UnauthorizedError } from '../../utils/errors';
import { requiredParam } from '../../utils/validation-utils';
import { calculateAutoLogoutAt, calculateExpiresAt } from '../utils/expires-at';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../utils/token-generator';

const clientId = process.env.GOOGLE_CLIENT_ID as string;

export const makeGoogleOAuthHandler = ({ userDb }: { userDb: UserDb }) => {
  const googleOAuthHandler = async (
    oldRefreshToken: string | undefined,
    credential: string,
  ) => {
    requiredParam(credential, 'Credential');

    const client = new OAuth2Client(clientId);
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: clientId,
    });
    const payload = ticket.getPayload();
    if (!payload) {
      throw new UnauthorizedError('Invalid token.');
    }

    const email = payload.email;
    if (!email) {
      throw new InvalidOperationError(
        'Email not provided in the token payload.',
      );
    }

    const user = await userDb.isExisting({ email });
    if (!user) {
      return { accountNotFound: true };
    }

    let newRefreshTokenArray = !oldRefreshToken
      ? user.refreshToken
      : user.refreshToken.filter((rt) => rt.token !== refreshToken);

    if (oldRefreshToken) {
      const foundToken = await userDb.findByToken({
        refreshToken: oldRefreshToken,
      });
      if (!foundToken) {
        newRefreshTokenArray = [];
      }
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
  return googleOAuthHandler;
};
