import { Model } from 'mongoose';
import { IEmailVerificationToken } from '../../types/email-verification-token.type';
import { UserUniqueIdentifier } from '../../types/unique-identifier.type';
import { IUser, IUserWithoutId } from '../../types/user.type';

export type UserModel = Model<IUserWithoutId>;
export type EmailVerificationTokenModel = Model<IEmailVerificationToken>;

export type UserDb = {
  create: (user: IUserWithoutId) => Promise<IUser>;
  findByEmailOrCreate: (email: string) => Promise<IUser>;
  getAll: () => Promise<IUser[]>;
  findOneByUsernameOrId: (
    query: Partial<UserUniqueIdentifier>,
  ) => Promise<IUser>;
  findById: (id: string) => Promise<IUser>;
  findByEmail: (email: string) => Promise<IUser>;
  findByToken: (params: { refreshToken: string }) => Promise<IUser | null>;
  isExisting: (query: Partial<UserUniqueIdentifier>) => Promise<IUser | null>;
  updateById: (id: string, query: Partial<IUser>) => Promise<IUser>;
  deleteById: (id: string) => Promise<IUser>;
};

export type EmailVerificationTokenDb = {
  create: (
    emailVerificationToken: IEmailVerificationToken,
  ) => Promise<IEmailVerificationToken>;
  findByEmail: (email: string) => Promise<IEmailVerificationToken>;
  isEmailExisting: (email: string) => Promise<IEmailVerificationToken | null>;
  updateByEmail: (
    email: string,
    query: Partial<IEmailVerificationToken>,
  ) => Promise<IEmailVerificationToken>;
  deleteByEmail: (email: string) => Promise<IEmailVerificationToken>;
};
