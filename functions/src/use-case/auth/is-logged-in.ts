import { UnauthorizedError } from '../../utils/errors';
import { VerifyToken } from '../types/jwt.type';

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string;

export const makeIsLoggedIn = ({ verify }: { verify: VerifyToken }) => {
  const isLoggedIn = (accessToken: string | undefined) => {
    if (!accessToken) {
      throw new UnauthorizedError('Missing token.');
    }

    try {
      verify(accessToken, accessTokenSecret);
    } catch (error) {
      throw new UnauthorizedError(error);
    }
  };
  return isLoggedIn;
};
