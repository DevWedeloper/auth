import { NextFunction, Request, Response } from 'express';
import { isEmailUnique } from '../../use-case/types/user.type';

export const makeIsEmailUniqueEndpoint = ({
  isEmailUnique,
}: {
  isEmailUnique: isEmailUnique;
}) => {
  const isEmailUniqueEndpoint = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> => {
    try {
      const message = await isEmailUnique(req.params.email);
      return res.status(200).json({ message });
    } catch (error) {
      next(error);
    }
  };
  return isEmailUniqueEndpoint;
};
