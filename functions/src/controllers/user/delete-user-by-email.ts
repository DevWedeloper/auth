import { NextFunction, Request, Response } from 'express';
import { deleteUserByEmail } from '../../use-case/types/user.type';

export const makeDeleteUserByEmailEndpoint = ({
  deleteUserByEmail,
}: {
  deleteUserByEmail: deleteUserByEmail;
}) => {
  const deleteUserByEmailEndpoint = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> => {
    try {
      const { email, password } = req.body;
      await deleteUserByEmail(email, password);
      return res.status(204).json();
    } catch (error) {
      next(error);
    }
  };
  return deleteUserByEmailEndpoint;
};
