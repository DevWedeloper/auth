import { AuthService, UserService } from '../use-case';
import { makeGetAutoLogoutAtEndpoint } from './auth/get-auto-logout-at';
import { makeGetRoleEndpoint } from './auth/get-role';
import { makeGoogleOAuthHandlerEndpoint } from './auth/google-OAuth-handler';
import { makeIsLoggedInEndpoint } from './auth/is-logged-in';
import { makeLoginEndpoint } from './auth/login';
import { makeLogoutEndpoint } from './auth/logout';
import { makeRefreshAccessTokenEndpoint } from './auth/refresh-access-token';
import { makeRequestEmailVerificationCodeEndpoint } from './auth/request-email-verification-code';
import { makeCreateUserEndpoint } from './user/create-user';
import { makeGetAllUsersEndpoint } from './user/get-all-users';
import { makeGetUserByIdEndpoint } from './user/get-user-by-id';

export const createUserEndpoint = makeCreateUserEndpoint({
  createUser: UserService.createUser,
});
export const getAllUsersEndpoint = makeGetAllUsersEndpoint({
  getAllUsers: UserService.getAllUsers,
});
export const getUserByIdEndpoint = makeGetUserByIdEndpoint({
  getUserById: UserService.getUserById,
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
