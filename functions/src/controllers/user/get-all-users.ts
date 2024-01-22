import { NextFunction, Request, Response } from 'express';
import { getAllUsers } from '../../use-case/types/user.type';

export const makeGetAllUsersEndpoint = ({
  getAllUsers,
}: {
  getAllUsers: getAllUsers;
}) => {
  const getAllUserEndpoint = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    try {
      const users = await getAllUsers();
      return res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  };
  return getAllUserEndpoint;
};
