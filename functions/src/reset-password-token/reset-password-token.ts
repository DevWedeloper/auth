import { IResetPasswordToken } from '../types/reset-password-token.type';
import {
  requiredParam,
  validateDateType,
  validateEmail,
  validateStringType,
} from '../utils/validation-utils';

export const makeResetPasswordToken = ({
  email,
  token,
  createdAt,
}: IResetPasswordToken) => {
  requiredParam(email, 'Email');
  requiredParam(token, 'Token');
  requiredParam(createdAt, 'Created At');

  validateStringType(email, 'Email');
  validateStringType(token, 'Token');
  validateDateType(createdAt, 'Created At');

  validateEmail(email, 'Email');

  return Object.freeze({ email, token, createdAt });
};
