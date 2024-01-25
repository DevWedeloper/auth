import { IUser } from '../../types/user.type';

export type createUser = (
  email: string,
  username: string,
  password: string,
  verificationCode: string,
) => Promise<void>;

export type getAllUsers = () => Promise<IUser[]>;

export type getUserById = (id: string) => Promise<IUser>;

export type updateEmailByEmail = (
  email: string,
  newEmail: string,
  verificationCode: string,
) => Promise<void>;

export type updatePasswordByEmail = (
  email: string,
  password: string,
  newPassword: string,
) => Promise<void>;

export type updateUsernameByEmail = (
  email: string,
  username: string,
  verificationCode: string,
) => Promise<void>;

export type deleteUserByEmail = (
  email: string,
  password: string,
) => Promise<void>;

export type forgotPassword = (
  email: string,
  resetPasswordUrl: string,
) => Promise<void>;

export type resetPassword = (token: string, password: string) => Promise<void>;
