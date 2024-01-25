import { AuthService, restrictedUserActions } from '../use-case';
import { makeIsTokenFromUserMiddleware } from './is-token-from-user';
import { makeRestrictedUserActionsMiddleware } from './restricted-user-actions';

export const isTokenFromUserMiddleware = makeIsTokenFromUserMiddleware({
  isTokenFromUser: AuthService.isTokenFromUser,
});

export const restrictedUserActionsMiddleware =
  makeRestrictedUserActionsMiddleware({ restrictedUserActions });
