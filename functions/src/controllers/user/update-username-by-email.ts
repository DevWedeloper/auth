import { NextFunction, Request, Response } from 'express';
import { getEmail } from '../../use-case/types/auth.type';
import { updateUsernameByEmail } from '../../use-case/types/user.type';

export const makeUpdateUsernameByEmailEndpoint = ({
  updateUsernameByEmail,
  getEmail,
}: {
  updateUsernameByEmail: updateUsernameByEmail;
  getEmail: getEmail;
}) => {
  const updateUsernameByEmailEndpoint = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> => {
    try {
      const { username, verificationCode } = req.body;
      const { email } = await getEmail(req.cookies.accessToken);
      await updateUsernameByEmail(email, username, verificationCode);
      return res.status(200).json();
    } catch (error) {
      next(error);
    }
  };
  return updateUsernameByEmailEndpoint;
};
