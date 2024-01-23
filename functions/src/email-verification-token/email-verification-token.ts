import { IEmailVerificationToken } from '../types/email-verification-token.type';
import {
  requiredParam,
  validateDateType,
  validateEmail,
  validateStringType,
} from '../utils/validation-utils';

export const makeEmailVerificationToken = ({
  email,
  verificationCode,
  createdAt,
}: IEmailVerificationToken) => {
  requiredParam(email, 'Email');
  requiredParam(verificationCode, 'Verification Code');
  requiredParam(createdAt, 'Created At');

  validateStringType(email, 'Email');
  validateStringType(verificationCode, 'Verification Code');
  validateDateType(createdAt, 'Created At');

  validateEmail(email, 'Email');

  return Object.freeze({ email, verificationCode, createdAt });
};
