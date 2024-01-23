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
    next: NextFunction,
  ): Promise<void | Response> => {
    try {
      const { email, username, password, verificationCode } = req.body;
      await createUser(
        email,
        username,
        password,
        verificationCode,
      );
      return res.status(201).json();
    } catch (error) {
      next(error);
    }
  };
  return createUserEndpoint;
};
