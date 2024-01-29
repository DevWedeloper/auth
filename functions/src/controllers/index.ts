import {
  AuthService,
  UserService,
  getResetPasswordTokenByToken,
} from '../use-case';
import { makeGetAutoLogoutAtEndpoint } from './auth/get-auto-logout-at';
import { makeGetRoleEndpoint } from './auth/get-role';
import { makeGoogleOAuthHandlerEndpoint } from './auth/google-OAuth-handler';
import { makeIsLoggedInEndpoint } from './auth/is-logged-in';
import { makeLoginEndpoint } from './auth/login';
import { makeLogoutEndpoint } from './auth/logout';
import { makeRefreshAccessTokenEndpoint } from './auth/refresh-access-token';
import { makeRequestEmailVerificationCodeEndpoint } from './auth/request-email-verification-code';
import { makeCheckResetPasswordTokenExistenceMiddleware } from './is-existing/check-reset-password-token-existence';
import { makeIsEmailUniqueEndpoint } from './is-unique/is-email-unique';
import { makeIsUsernameUniqueEndpoint } from './is-unique/is-username-unique';
import { makeCreateUserEndpoint } from './user/create-user';
import { makeDeleteUserByEmailEndpoint } from './user/delete-user-by-email';
import { makeForgotPasswordEndpoint } from './user/forgot-password';
import { makeGetAllUsersEndpoint } from './user/get-all-users';
import { makeGetUserByIdEndpoint } from './user/get-user-by-id';
import { makeResetPasswordEndpoint } from './user/reset-password';
import { makeUpdateEmailByEmailEndpoint } from './user/update-email-by-email';
import { makeUpdatePasswordByEmailEndpoint } from './user/update-password-by-email';
import { makeUpdateUsernameByEmailEndpoint } from './user/update-username-by-email';

export const createUserEndpoint = makeCreateUserEndpoint({
  createUser: UserService.createUser,
});
export const getAllUsersEndpoint = makeGetAllUsersEndpoint({
  getAllUsers: UserService.getAllUsers,
});
export const getUserByIdEndpoint = makeGetUserByIdEndpoint({
  getUserById: UserService.getUserById,
});
export const isEmailUniqueEndpoint = makeIsEmailUniqueEndpoint({
  isEmailUnique: UserService.isEmailUnique,
});
export const isUsernameUniqueEndpoint = makeIsUsernameUniqueEndpoint({
  isUsernameUnique: UserService.isUsernameUnique,
});
export const updateEmailByEmailEndpoint = makeUpdateEmailByEmailEndpoint({
  updateEmailByEmail: UserService.updateEmailByEmail,
});
export const updatePasswordByEmailEndpoint = makeUpdatePasswordByEmailEndpoint({
  updatePasswordByEmail: UserService.updatePasswordByEmail,
});
export const updateUsernameByEmailEndpoint = makeUpdateUsernameByEmailEndpoint({
  updateUsernameByEmail: UserService.updateUsernameByEmail,
});
export const deleteUserByEmailEndpoint = makeDeleteUserByEmailEndpoint({
  deleteUserByEmail: UserService.deleteUserByEmail,
});
export const forgotPasswordEndpoint = makeForgotPasswordEndpoint({
  forgotPassword: UserService.forgotPassword,
});
export const resetPasswordEndpoint = makeResetPasswordEndpoint({
  resetPassword: UserService.resetPassword,
});

export const getAutoLogoutAtEndpoint = makeGetAutoLogoutAtEndpoint({
  getAutoLogoutAt: AuthService.getAutoLogoutAt,
});
export const getRoleEndpoint = makeGetRoleEndpoint({
  getRole: AuthService.getRole,
});
export const googleOAuthHandlerEndpoint = makeGoogleOAuthHandlerEndpoint({
  googleOAuthHandler: AuthService.googleOAuthHandler,
});
export const isLoggedInEndpoint = makeIsLoggedInEndpoint({
  isLoggedIn: AuthService.isLoggedIn,
});
export const loginEndpoint = makeLoginEndpoint({ login: AuthService.login });
export const logoutEndpoint = makeLogoutEndpoint({
  logout: AuthService.logout,
});
export const refreshAccessTokenEndpoint = makeRefreshAccessTokenEndpoint({
  refreshAccessToken: AuthService.refreshAccessToken,
});
export const requestEmailVerificationCodeEndpoint =
  makeRequestEmailVerificationCodeEndpoint({
    requestEmailVerificationCode: AuthService.requestEmailVerificationCode,
  });

export const checkResetPasswordTokenExistenceEndpoint =
  makeCheckResetPasswordTokenExistenceMiddleware({
    getResetPasswordTokenByToken,
  });
