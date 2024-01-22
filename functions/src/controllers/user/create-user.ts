import { NextFunction, Request, Response } from 'express';
import { createUser } from '../../use-case/types/user.type';

export const makeCreateUserEndpoint = ({
  createUser,
}: {
  createUser: createUser;
}) => {
  const createUserEndpoint = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    try {
      const user = await createUser(req.body.user);
      return res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  };
  return createUserEndpoint;
};
