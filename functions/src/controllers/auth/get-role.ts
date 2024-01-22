import { NextFunction, Request, Response } from 'express';
import { getRole } from '../../use-case/types/auth.type';

export const makeGetRoleEndpoint = ({ getRole }: { getRole: getRole }) => {
  const getRoleEndpoint = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> => {
    try {
      const { role } = getRole(req.cookies.accessToken);
      return res.status(200).json({ role });
    } catch (error) {
      next(error);
    }
  };
  return getRoleEndpoint;
};
