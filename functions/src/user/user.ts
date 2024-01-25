import { IUserWithoutId } from '../types/user.type';
import { deepFreeze } from '../utils/deep-freeze';
import {
  requiredParam,
  validateAlphanumericUnderscore,
  validateDateType,
  validateEmail,
  validateNumberRange,
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
}: IUserWithoutId) => {
  requiredParam(email, 'Email');
  requiredParam(username, 'Username');
  requiredParam(password, 'Password');
  requiredParam(role, 'Role');
  requiredParam(refreshToken, 'Refresh Token');

  validateStringType(username, 'Username');
  validateStringType(password, 'Password');
  validateEmail(email, 'Email');

  validateNumberRange(username.length, 6, 20, 'Username length');

  validateAlphanumericUnderscore(username, 'Username');

  validatePassword(password);

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
