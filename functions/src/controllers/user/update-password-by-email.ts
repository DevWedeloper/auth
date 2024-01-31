import { NextFunction, Request, Response } from 'express';
import { getEmail } from '../../use-case/types/auth.type';
import { updatePasswordByEmail } from '../../use-case/types/user.type';

export const makeUpdatePasswordByEmailEndpoint = ({
  updatePasswordByEmail,
  getEmail,
}: {
  updatePasswordByEmail: updatePasswordByEmail;
  getEmail: getEmail;
}) => {
  const updatePasswordByEmailEndpoint = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> => {
    try {
      const { password, newPassword } = req.body;
      const { email } = await getEmail(req.cookies.accessToken);
      await updatePasswordByEmail(email, password, newPassword);
      return res.status(200).json();
    } catch (error) {
      next(error);
    }
  };
  return updatePasswordByEmailEndpoint;
};
