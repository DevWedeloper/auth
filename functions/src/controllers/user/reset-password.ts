import { NextFunction, Request, Response } from 'express';
import { resetPassword } from '../../use-case/types/user.type';

export const makeResetPasswordEndpoint = ({
  resetPassword,
}: {
  resetPassword: resetPassword;
}) => {
  const resetPasswordEndpoint = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> => {
    try {
      await resetPassword(req.query.token as string, req.body.password);
      return res.status(200).json();
    } catch (error) {
      next(error);
    }
  };
  return resetPasswordEndpoint;
};
