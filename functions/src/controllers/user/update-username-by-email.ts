import { NextFunction, Request, Response } from 'express';
import { updateUsernameByEmail } from '../../use-case/types/user.type';

export const makeUpdateUsernameByEmailEndpoint = ({
  updateUsernameByEmail,
}: {
  updateUsernameByEmail: updateUsernameByEmail;
}) => {
  const updateUsernameByEmailEndpoint = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> => {
    try {
      const { email, username, verificationCode } = req.body;
      await updateUsernameByEmail(email, username, verificationCode);
      return res.status(200).json();
    } catch (error) {
      next(error);
    }
  };
  return updateUsernameByEmailEndpoint;
};
