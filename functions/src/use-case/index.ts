import { compareSync, hash } from 'bcrypt';
import { verify } from 'jsonwebtoken';
import { emailVerificationTokenDb, userDb } from '../data-access';
import { makeGetAutoLogoutAt } from './auth/get-auto-logout-at';
import { makeGetRole } from './auth/get-role';
import { makeGoogleOAuthHandler } from './auth/google-OAuth-handler';
import { makeIsLoggedIn } from './auth/is-logged-in';
import { makeLoggedInUser } from './auth/logged-in-user';
import { makeLogin } from './auth/login';
import { makeLogout } from './auth/logout';
import { makeRefreshAccessToken } from './auth/refresh-access-token';
import { makeRequestEmailVerificationCode } from './auth/request-email-verification-code';
import { makeCreateUser } from './user/create-user';
import { makeGetAllUsers } from './user/get-all-users';
import { makeGetUserById } from './user/get-user-by-id';
import { makeUpdateUsernameByEmail } from './user/update-username-by-email';

const createUser = makeCreateUser({ userDb, emailVerificationTokenDb, hash });
const getAllUsers = makeGetAllUsers({ userDb });
const getUserById = makeGetUserById({ userDb });
const updateUsernameByEmail = makeUpdateUsernameByEmail({
  userDb,
  emailVerificationTokenDb,
});

export const UserService = Object.freeze({
  createUser,
  getAllUsers,
  getUserById,
  updateUsernameByEmail,
});

const getAutoLogoutAt = makeGetAutoLogoutAt({ userDb });
const getRole = makeGetRole({ verify: verify });
const googleOAuthHandler = makeGoogleOAuthHandler({ userDb });
const isLoggedIn = makeIsLoggedIn({ verify });
const loggedInUser = makeLoggedInUser({ verify });
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
  loggedInUser,
  login,
  logout,
  refreshAccessToken,
  requestEmailVerificationCode,
});
