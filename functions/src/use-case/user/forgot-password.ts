import {
  ResetPasswordTokenDb,
  UserDb,
} from '../../data-access/types/data-access.type';
import { requiredParam } from '../../utils/validation-utils';
import { generateResetPasswordToken } from '../utils/generate-reset-password-token';
import { sendResetPasswordTokenAndUrl } from '../utils/send-verification';

export const makeForgotPassword = ({
  userDb,
  resetPasswordTokenDb,
}: {
  userDb: UserDb;
  resetPasswordTokenDb: ResetPasswordTokenDb;
}) => {
  const forgotPassword = async (email: string, resetPasswordUrl: string) => {
    requiredParam(email, 'Email');
    requiredParam(resetPasswordUrl, 'Reset Password URL');

    await userDb.findByEmail(email);

    const resetPasswordToken = generateResetPasswordToken();

    const foundToken = await resetPasswordTokenDb.isEmailExisting(email);
    if (foundToken) {
      await resetPasswordTokenDb.updateByEmail(email, {
        token: resetPasswordToken,
        createdAt: new Date(),
      });
    } else {
      await resetPasswordTokenDb.create({
        email,
        token: resetPasswordToken,
        createdAt: new Date(),
      });
    }

    await sendResetPasswordTokenAndUrl(
      email,
      resetPasswordToken,
      resetPasswordUrl,
    );
  };
  return forgotPassword;
};
