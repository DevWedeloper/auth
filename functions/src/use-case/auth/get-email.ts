import { UserDb } from '../../data-access/types/data-access.type';
import { UnauthorizedError } from '../../utils/errors';
import { TokenPayload, VerifyToken } from '../types/jwt.type';

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string;

export const makeGetEmail = ({
  userDb,
  verify,
}: {
  userDb: UserDb;
  verify: VerifyToken;
}) => {
  const getEmail = async (accessToken: string) => {
    if (!accessToken) {
      throw new UnauthorizedError('Missing token.');
    }

    let decodedToken;
    try {
      decodedToken = verify(accessToken, accessTokenSecret) as TokenPayload;
    } catch (error) {
      throw new UnauthorizedError(error);
    }

    const user = await userDb.findOneByUsernameOrId({
      username: decodedToken.username,
    });

    return { email: user.email };
  };
  return getEmail;
};
