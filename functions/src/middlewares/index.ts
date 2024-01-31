import { AuthService, restrictedUserActions } from '../use-case';
import { makeIsLoggedInMiddleware } from './is-logged-in';
import { makeRestrictedUserActionsMiddleware } from './restricted-user-actions';

export const restrictedUserActionsMiddleware =
  makeRestrictedUserActionsMiddleware({ restrictedUserActions });

export const isLoggedInMiddleware = makeIsLoggedInMiddleware({
  isLoggedIn: AuthService.isLoggedIn,
});
