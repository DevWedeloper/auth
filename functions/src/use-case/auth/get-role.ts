import { UnauthorizedError } from '../../utils/errors';
import { TokenPayload, VerifyToken } from '../types/jwt.type';

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string;

export const makeGetRole = ({ verify }: { verify: VerifyToken }) => {
  const getRole = (accessToken: string) => {
    if (!accessToken) {
      throw new UnauthorizedError('Missing token.');
    }

    let decodedToken;
    try {
      decodedToken = verify(accessToken, accessTokenSecret) as TokenPayload;
    } catch (error) {
      throw new UnauthorizedError(error);
    }

    return { role: decodedToken.role };
  };
  return getRole;
};
