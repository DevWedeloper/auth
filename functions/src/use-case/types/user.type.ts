import { IUser } from '../../types/user.type';

export type createUser = (
  email: string,
  username: string,
  password: string,
  verificationCode: string,
) => Promise<IUser>;
export type getAllUsers = () => Promise<IUser[]>;
export type getUserById = (id: string) => Promise<IUser>;
