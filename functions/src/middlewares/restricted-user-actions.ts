import { NextFunction, Request, Response } from 'express';
import { restrictedUserActions } from '../use-case/types/restricted-user-actions.type';

export const makeRestrictedUserActionsMiddleware = ({
  restrictedUserActions,
}: {
  restrictedUserActions: restrictedUserActions;
}) => {
  const restrictedUserActionsMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      restrictedUserActions(req.cookies.accessToken);
      next();
    } catch (error) {
      next(error);
    }
  };
  return restrictedUserActionsMiddleware;
};
