import { IUserWithoutId } from '../types/user-type';
import { deepFreeze } from '../utils/deep-freeze';
import {
  requiredParam,
  validateAlphanumericUnderscore,
  validateDateType,
  validateEmail,
  validatePassword,
  validateRole,
  validateStringType,
} from '../utils/validation-utils';

export const makeUser = ({
  email,
  username,
  password,
  role,
  refreshToken,
}: {
  email: string;
  username: string | null;
  password?: string;
  role: 'admin' | 'standard';
  refreshToken: { token: string; expiresAt: Date; autoLogoutAt: Date }[];
}): IUserWithoutId => {
  requiredParam(email, 'Email');
  requiredParam(role, 'Role');
  requiredParam(refreshToken, 'Refresh Token');

  validateEmail(email, 'Email');

  if (username) {
    validateStringType(username, 'Username');
    validateAlphanumericUnderscore(username, 'Username');
  }

  if (password) {
    validateStringType(password, 'Password');
    validatePassword(password);
  }

  validateRole(role);

  refreshToken.forEach((token) => {
    validateStringType(token.token, 'Token');
    validateDateType(token.expiresAt, 'Expires At');
    validateDateType(token.autoLogoutAt, 'Auto Logout At');
    deepFreeze(token);
  });

  return Object.freeze({
    email,
    username,
    password,
    role,
    refreshToken,
  });
};
