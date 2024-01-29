import { NextFunction, Request, Response } from 'express';
import { getResetPasswordTokenByToken } from '../../use-case/types/reset-password-token.type';

export const makeCheckResetPasswordTokenExistenceMiddleware = ({
  getResetPasswordTokenByToken,
}: {
  getResetPasswordTokenByToken: getResetPasswordTokenByToken;
}) => {
  const checkResetPasswordTokenExistenceMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> => {
    try {
      await getResetPasswordTokenByToken(req.params.token);
      return res.status(200).json();
    } catch (error) {
      next(error);
    }
  };
  return checkResetPasswordTokenExistenceMiddleware;
};
