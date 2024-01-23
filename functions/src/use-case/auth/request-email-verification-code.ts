import {
  EmailVerificationTokenDb,
  UserDb,
} from '../../data-access/types/data-access.type';
import { UniqueConstraintError } from '../../utils/errors';
import { requiredParam } from '../../utils/validation-utils';
import { generateVerificationCode } from '../utils/generate-verification-code';
import { sendVerificationCode } from '../utils/send-verification-code';

export const makeRequestEmailVerificationCode = ({
  userDb,
  emailVerificationTokenDb,
}: {
  userDb: UserDb;
  emailVerificationTokenDb: EmailVerificationTokenDb;
}) => {
  const requestEmailVerificationCode = async (email: string) => {
    requiredParam(email, 'Email');

    const isEmailExisting = await userDb.isExisting({ email });
    if (isEmailExisting) {
      throw new UniqueConstraintError('A user with this email already exists.');
    }

    const verificationCode = generateVerificationCode();

    const foundToken = await emailVerificationTokenDb.isEmailExisting(email);
    if (foundToken) {
      await emailVerificationTokenDb.updateByEmail(email, {
        verificationCode,
        createdAt: new Date(),
      });
    } else {
      await emailVerificationTokenDb.create({
        email,
        verificationCode,
        createdAt: new Date(),
      });
    }

    await sendVerificationCode(email, verificationCode);
  };
  return requestEmailVerificationCode;
};
