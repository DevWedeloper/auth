import { AuthService } from '../use-case';
import { makeLoggedInUserMiddleware } from './logged-in-user';

export const loggedInUserMiddleware = makeLoggedInUserMiddleware({
  loggedInUser: AuthService.loggedInUser,
});
