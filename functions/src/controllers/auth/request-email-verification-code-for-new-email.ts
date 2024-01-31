import { NextFunction, Request, Response } from 'express';
import { requestEmailVerificationCode } from '../../use-case/types/auth.type';

export const makeRequestEmailVerificationCodeForNewEmailEndpoint = ({
  requestEmailVerificationCode,
}: {
  requestEmailVerificationCode: requestEmailVerificationCode;
}) => {
  const requestEmailVerificationCodeForNewEmailEndpoint = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> => {
    try {
      await requestEmailVerificationCode(req.body.email);
      return res.status(201).send();
    } catch (error) {
      next(error);
    }
  };
  return requestEmailVerificationCodeForNewEmailEndpoint;
};
