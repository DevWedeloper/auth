import { NextFunction, Request, Response } from 'express';
import { getUserById } from '../../use-case/types/user.type';

export const makeGetUserByIdEndpoint = ({
  getUserById,
}: {
  getUserById: getUserById;
}) => {
  const getUserByIdEndpoint = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> => {
    try {
      const user = await getUserById(req.params.id);
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };
  return getUserByIdEndpoint;
};
