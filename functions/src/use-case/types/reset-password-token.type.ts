import { IResetPasswordToken } from '../../types/reset-password-token.type';

export type getResetPasswordTokenByToken = (
  token: string,
) => Promise<IResetPasswordToken>;
