import { NextFunction, Request, Response } from 'express';
import { updateEmailByEmail } from '../../use-case/types/user.type';

export const makeUpdateEmailByEmailEndpoint = ({
  updateEmailByEmail,
}: {
  updateEmailByEmail: updateEmailByEmail;
}) => {
  const updateEmailByEmailEndpoint = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> => {
    try {
      const { email, newEmail, verificationCode } = req.body;
      await updateEmailByEmail(email, newEmail, verificationCode);
      return res.status(200).json();
    } catch (error) {
      next(error);
    }
  };
  return updateEmailByEmailEndpoint;
};
