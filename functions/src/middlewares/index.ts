import { restrictedUserActions } from '../use-case';
import { makeRestrictedUserActionsMiddleware } from './restricted-user-actions';

export const restrictedUserActionsMiddleware =
  makeRestrictedUserActionsMiddleware({ restrictedUserActions });
