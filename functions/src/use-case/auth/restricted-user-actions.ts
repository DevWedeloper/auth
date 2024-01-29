import { UnauthorizedError } from '../../utils/errors';
import { TokenPayload, VerifyToken } from '../types/jwt.type';

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string;

export const makeRestrictedUserActions = ({
  verify,
}: {
  verify: VerifyToken;
}) => {
  const restrictedUserActions = (accessToken: string | undefined) => {
    if (!accessToken) {
      throw new UnauthorizedError('Missing token.');
    }

    let decodedToken;
    try {
      decodedToken = verify(accessToken, accessTokenSecret) as TokenPayload;
    } catch (error) {
      throw new UnauthorizedError(error);
    }

    if (
      decodedToken.username === 'standard' ||
      decodedToken.username === 'admin'
    ) {
      throw new UnauthorizedError('Owner made accounts can not be modified.');
    }
  };
  return restrictedUserActions;
};
