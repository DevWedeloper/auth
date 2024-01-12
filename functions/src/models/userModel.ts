import { UserUniqueIdentifier } from '../types/uniqueIdentifier';
import { IUser, IUserWithoutId } from '../types/userType';
import { User } from './schemas/userSchema';

type UserCreate = Omit<IUserWithoutId, 'refreshToken'>;

export const create = async (user: UserCreate): Promise<IUser> => {
  return (await User.create(user)).toObject();
};

export const getAll = async (): Promise<IUser[]> => {
  return await User.find();
};

export const findOneByUsernameOrId = async (
  query: Partial<UserUniqueIdentifier>
): Promise<IUser> => {
  return (await User.findOne(query)) || throwUserNotFoundError();
};

export const findById = async (id: string): Promise<IUser> => {
  return (await User.findById(id)) || throwUserNotFoundError();
};

export const findByToken = async ({
  refreshToken,
}: {
  refreshToken: string;
}): Promise<IUser | null> => {
  return await User.findOne({ 'refreshToken.token': refreshToken });
};

export const isExisting = async (
  query: Partial<UserUniqueIdentifier>
): Promise<IUser | null> => {
  return await User.findOne(query);
};

export const updateById = async (
  id: string,
  query: Partial<IUserWithoutId>
): Promise<IUser> => {
  return (
    (await User.findByIdAndUpdate(id, query, {
      new: true,
      runValidators: true,
    })) || throwUserNotFoundError()
  );
};

export const deleteById = async (id: string): Promise<IUser> => {
  return (await User.findByIdAndDelete(id)) || throwUserNotFoundError();
};

const throwUserNotFoundError = () => {
  throw new Error('User not found.');
};
