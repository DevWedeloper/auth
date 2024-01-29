import { NextFunction, Request, Response } from 'express';
import { forgotPassword } from '../../use-case/types/user.type';

export const makeForgotPasswordEndpoint = ({
  forgotPassword,
}: {
  forgotPassword: forgotPassword;
}) => {
  const forgotPasswordEndpoint = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> => {
    try {
      await forgotPassword(
        req.body.email,
        req.query.reset_password_url as string,
      );
      return res.status(200).json();
    } catch (error) {
      next(error);
    }
  };
  return forgotPasswordEndpoint;
};
