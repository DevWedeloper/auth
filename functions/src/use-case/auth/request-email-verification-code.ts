import { EmailVerificationTokenDb } from '../../data-access/types/data-access.type';
import { requiredParam } from '../../utils/validation-utils';
import { generateVerificationCode } from '../utils/generate-verification-code';
import { sendVerificationCode } from '../utils/send-verification-code';

export const makeRequestEmailVerificationCode = ({
  emailVerificationTokenDb,
}: {
  emailVerificationTokenDb: EmailVerificationTokenDb;
}) => {
  const requestEmailVerificationCode = async (email: string) => {
    requiredParam(email, 'Email');

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
