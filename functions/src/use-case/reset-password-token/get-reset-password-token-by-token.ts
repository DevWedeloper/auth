import { ResetPasswordTokenDb } from '../../data-access/types/data-access.type';
import { requiredParam } from '../../utils/validation-utils';

export const makeGetResetPasswordTokenByToken = ({
  resetPasswordTokenDb,
}: {
  resetPasswordTokenDb: ResetPasswordTokenDb;
}) => {
  const getResetPasswordTokenByToken = async (token: string) => {
    requiredParam(token, 'Reset Password Token');

    return resetPasswordTokenDb.findByToken(token);
  };
  return getResetPasswordTokenByToken;
};
