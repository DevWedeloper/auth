import { UnauthorizedError } from '../../utils/errors';
import { TokenPayload, VerifyToken } from '../types/jwt.type';

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string;

export const makeLoggedInUser = ({ verify }: { verify: VerifyToken }) => {
  const loggedInUser = (accessToken: string | undefined) => {
    if (!accessToken) {
      throw new UnauthorizedError('Access token missing.');
    }

    let decodedToken;
    try {
      decodedToken = verify(accessToken, accessTokenSecret) as TokenPayload;
    } catch (error) {
      throw new UnauthorizedError(error);
    }

    const { userId, role } = decodedToken;

    return { userId, role };
  };
  return loggedInUser;
};
