import { NextFunction, Request, Response } from 'express';
import { updatePasswordByEmail } from '../../use-case/types/user.type';

export const makeUpdatePasswordByEmailEndpoint = ({
  updatePasswordByEmail,
}: {
  updatePasswordByEmail: updatePasswordByEmail;
}) => {
  const updatePasswordByEmailEndpoint = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> => {
    try {
      const { email, password, newPassword } = req.body;
      await updatePasswordByEmail(email, password, newPassword);
      return res.status(200).json();
    } catch (error) {
      next(error);
    }
  };
  return updatePasswordByEmailEndpoint;
};
