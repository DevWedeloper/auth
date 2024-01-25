import { UserDb } from '../../data-access/types/data-access.type';
import { ForbiddenError, UnauthorizedError } from '../../utils/errors';
import { requiredParam } from '../../utils/validation-utils';
import { TokenPayload, VerifyToken } from '../types/jwt.type';

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string;

export const makeIsTokenFromUser = ({
  userDb,
  verify,
}: {
  userDb: UserDb;
  verify: VerifyToken;
}) => {
  const isTokenFromUser = async (
    accessToken: string | undefined,
    email: string,
  ) => {
    if (!accessToken) {
      throw new UnauthorizedError('Access token missing.');
    }

    requiredParam(email, 'Email');

    let decodedToken;
    try {
      decodedToken = verify(accessToken, accessTokenSecret) as TokenPayload;
    } catch (error) {
      throw new UnauthorizedError(error);
    }

    const user = await userDb.findOneByUsernameOrId({
      username: decodedToken.username,
    });

    if (user.email !== email) {
      throw new ForbiddenError('Found user does not match provided email.');
    }
  };
  return isTokenFromUser;
};
