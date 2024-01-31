import { NextFunction, Request, Response } from 'express';
import { getEmail } from '../../use-case/types/auth.type';
import { updateEmailByEmail } from '../../use-case/types/user.type';

export const makeUpdateEmailByEmailEndpoint = ({
  updateEmailByEmail,
  getEmail,
}: {
  updateEmailByEmail: updateEmailByEmail;
  getEmail: getEmail;
}) => {
  const updateEmailByEmailEndpoint = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> => {
    try {
      const { newEmail, verificationCode } = req.body;
      const { email } = await getEmail(req.cookies.accessToken);
      await updateEmailByEmail(email, newEmail, verificationCode);
      return res.status(200).json();
    } catch (error) {
      next(error);
    }
  };
  return updateEmailByEmailEndpoint;
};
