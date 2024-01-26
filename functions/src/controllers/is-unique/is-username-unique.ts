import { NextFunction, Request, Response } from 'express';
import { isUsernameUnique } from '../../use-case/types/user.type';

export const makeIsUsernameUniqueEndpoint = ({
  isUsernameUnique,
}: {
  isUsernameUnique: isUsernameUnique;
}) => {
  const isUsernameUniqueEndpoint = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> => {
    try {
      const message = await isUsernameUnique(req.params.username);
      return res.status(200).json({ message });
    } catch (error) {
      next(error);
    }
  };
  return isUsernameUniqueEndpoint;
};
