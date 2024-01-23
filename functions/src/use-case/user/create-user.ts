import {
  EmailVerificationTokenDb,
  UserDb,
} from '../../data-access/types/data-access.type';
import { makeUser } from '../../user/user';
import { ForbiddenError, RequiredParameterError } from '../../utils/errors';
import { requiredParam } from '../../utils/validation-utils';
import { HashPassword } from '../types/bcrypt.type';

export const makeCreateUser = ({
  userDb,
  emailVerificationTokenDb,
  hash,
}: {
  userDb: UserDb;
  emailVerificationTokenDb: EmailVerificationTokenDb;
  hash: HashPassword;
}) => {
  const createUser = async (
    email: string,
    username: string,
    password: string,
    verificationCode: string,
  ) => {
    requiredParam(email, 'Email');
    requiredParam(username, 'Username');
    requiredParam(verificationCode, 'Verification Code');
    if (!password) {
      throw new RequiredParameterError('Password is required.');
    }

    // TODO: Send tokens
    const retrievedToken = await emailVerificationTokenDb.findByEmail(email);
    if (retrievedToken.verificationCode !== verificationCode) {
      throw new ForbiddenError('Entered code does not match.');
    }

    const user = makeUser({
      email,
      username,
      password,
      role: 'standard',
      refreshToken: [],
    });
    const hashedPassword = await hash(password, 10);
    return userDb.create({
      ...user,
      password: hashedPassword,
    });
  };
  return createUser;
};
