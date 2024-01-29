import {
  EmailVerificationTokenDb,
  UserDb,
} from '../../data-access/types/data-access.type';
import { makeUser } from '../../user/user';
import { ForbiddenError } from '../../utils/errors';
import { requiredParam } from '../../utils/validation-utils';

export const makeUpdateUsernameByEmail = ({
  userDb,
  emailVerificationTokenDb,
}: {
  userDb: UserDb;
  emailVerificationTokenDb: EmailVerificationTokenDb;
}) => {
  const updateUsernameByEmail = async (
    email: string,
    username: string,
    verificationCode: string,
  ) => {
    requiredParam(email, 'Email');
    requiredParam(username, 'Username');
    requiredParam(verificationCode, 'Verification Code');

    const retrievedToken = await emailVerificationTokenDb.findByEmail(email);
    if (retrievedToken.verificationCode !== verificationCode) {
      throw new ForbiddenError('Entered code does not match.');
    }

    const user = await userDb.findByEmail(email);
    const updatedUser = makeUser({ ...user, username });

    await emailVerificationTokenDb.deleteByEmail(email);

    await userDb.updateById(user._id, updatedUser);
  };
  return updateUsernameByEmail;
};
