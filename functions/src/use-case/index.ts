import { compareSync, hash } from 'bcrypt';
import { verify } from 'jsonwebtoken';
import {
  emailVerificationTokenDb,
  resetPasswordTokenDb,
  userDb,
} from '../data-access';
import { makeGetAutoLogoutAt } from './auth/get-auto-logout-at';
import { makeGetRole } from './auth/get-role';
import { makeGoogleOAuthHandler } from './auth/google-OAuth-handler';
import { makeIsLoggedIn } from './auth/is-logged-in';
import { makeIsTokenFromUser } from './auth/is-token-from-user';
import { makeLogin } from './auth/login';
import { makeLogout } from './auth/logout';
import { makeRefreshAccessToken } from './auth/refresh-access-token';
import { makeRequestEmailVerificationCode } from './auth/request-email-verification-code';
import { makeRestrictedUserActions } from './auth/restricted-user-actions';
import { makeCreateUser } from './user/create-user';
import { makeDeleteUserByEmail } from './user/delete-user-by-email';
import { makeForgotPassword } from './user/forgot-password';
import { makeGetAllUsers } from './user/get-all-users';
import { makeGetUserById } from './user/get-user-by-id';
import { makeResetPassword } from './user/reset-password';
import { makeUpdateEmailByEmail } from './user/update-email-by-email';
import { makeUpdatePasswordByEmail } from './user/update-password-by-email';
import { makeUpdateUsernameByEmail } from './user/update-username-by-email';

const createUser = makeCreateUser({ userDb, emailVerificationTokenDb, hash });
const getAllUsers = makeGetAllUsers({ userDb });
const getUserById = makeGetUserById({ userDb });
const updateEmailByEmail = makeUpdateEmailByEmail({
  userDb,
  emailVerificationTokenDb,
});
const updatePasswordByEmail = makeUpdatePasswordByEmail({
  userDb,
  comparePassword: compareSync,
  hash: hash,
});
const updateUsernameByEmail = makeUpdateUsernameByEmail({
  userDb,
  emailVerificationTokenDb,
});
const deleteUserByEmail = makeDeleteUserByEmail({
  userDb,
  comparePassword: compareSync,
});
const forgotPassword = makeForgotPassword({ userDb, resetPasswordTokenDb });
const resetPassword = makeResetPassword({ userDb, resetPasswordTokenDb, hash });

export const UserService = Object.freeze({
  createUser,
  getAllUsers,
  getUserById,
  updateEmailByEmail,
  updatePasswordByEmail,
  updateUsernameByEmail,
  deleteUserByEmail,
  forgotPassword,
  resetPassword,
});

const getAutoLogoutAt = makeGetAutoLogoutAt({ userDb });
const getRole = makeGetRole({ verify: verify });
const googleOAuthHandler = makeGoogleOAuthHandler({ userDb });
const isLoggedIn = makeIsLoggedIn({ verify });
const isTokenFromUser = makeIsTokenFromUser({ userDb, verify });
const login = makeLogin({ userDb, comparePassword: compareSync });
const logout = makeLogout({ userDb });
const refreshAccessToken = makeRefreshAccessToken({ userDb, verify });
const requestEmailVerificationCode = makeRequestEmailVerificationCode({
  emailVerificationTokenDb,
});

export const AuthService = Object.freeze({
  getAutoLogoutAt,
  getRole,
  googleOAuthHandler,
  isLoggedIn,
  isTokenFromUser,
  login,
  logout,
  refreshAccessToken,
  requestEmailVerificationCode,
});

export const restrictedUserActions = makeRestrictedUserActions({ verify });
