import { Model } from 'mongoose';
import { UserUniqueIdentifier } from '../../types/unique-identifier';
import { IUser, IUserWithoutId } from '../../types/user-type';

export type UserModel = Model<IUserWithoutId>;

export type UserDb = {
  create: (user: IUserWithoutId) => Promise<IUser>;
  findByEmailOrCreate: (email: string) => Promise<IUser>;
  getAll: () => Promise<IUser[]>;
  findOneByUsernameOrId: (
    query: Partial<UserUniqueIdentifier>
  ) => Promise<IUser>;
  findById: (id: string) => Promise<IUser>;
  findByToken: (params: { refreshToken: string }) => Promise<IUser | null>;
  isExisting: (query: Partial<UserUniqueIdentifier>) => Promise<IUser | null>;
  updateById: (id: string, query: Partial<IUser>) => Promise<IUser>;
  deleteById: (id: string) => Promise<IUser>;
};
