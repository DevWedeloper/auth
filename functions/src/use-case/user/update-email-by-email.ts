import {
  EmailVerificationTokenDb,
  UserDb,
} from '../../data-access/types/data-access.type';
import { makeUser } from '../../user/user';
import { ForbiddenError } from '../../utils/errors';
import { requiredParam } from '../../utils/validation-utils';

export const makeUpdateEmailByEmail = ({
  userDb,
  emailVerificationTokenDb,
}: {
  userDb: UserDb;
  emailVerificationTokenDb: EmailVerificationTokenDb;
}) => {
  const updateEmailByEmail = async (
    email: string,
    newEmail: string,
    verificationCode: string,
  ) => {
    requiredParam(email, 'Email');
    requiredParam(newEmail, 'New Email');
    requiredParam(verificationCode, 'Verification Code');

    const retrievedToken = await emailVerificationTokenDb.findByEmail(newEmail);
    if (retrievedToken.verificationCode !== verificationCode) {
      throw new ForbiddenError('Entered code does not match.');
    }

    const user = await userDb.findByEmail(email);
    const updatedUser = makeUser({ ...user, email: newEmail });
    
    await emailVerificationTokenDb.deleteByEmail(newEmail);

    await userDb.updateById(user._id, updatedUser);
  };
  return updateEmailByEmail;
};
