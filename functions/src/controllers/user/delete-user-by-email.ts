import { NextFunction, Request, Response } from 'express';
import { getEmail } from '../../use-case/types/auth.type';
import { deleteUserByEmail } from '../../use-case/types/user.type';

export const makeDeleteUserByEmailEndpoint = ({
  deleteUserByEmail,
  getEmail,
}: {
  deleteUserByEmail: deleteUserByEmail;
  getEmail: getEmail;
}) => {
  const deleteUserByEmailEndpoint = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> => {
    try {
      const { password } = req.body;
      const { email } = await getEmail(req.cookies.accessToken);
      await deleteUserByEmail(email, password);
      return res.status(204).json();
    } catch (error) {
      next(error);
    }
  };
  return deleteUserByEmailEndpoint;
};
