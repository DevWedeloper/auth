import { UserUniqueIdentifier } from '../types/unique-identifier.type';
import { IUser, IUserWithoutId } from '../types/user.type';
import { NotFoundError } from '../utils/errors';
import { UserModel } from './types/data-access.type';
import {
  handleMongooseCastObjectIdError,
  handleMongooseUniqueConstraintError,
} from './utils/handle-mongoose-errors';

export const makeUserDb = ({ User }: { User: UserModel }) => {
  const create = async (user: IUserWithoutId): Promise<IUser> => {
    try {
      return (await User.create(user)).toObject();
    } catch (error) {
      if (error instanceof Error) {
        handleMongooseUniqueConstraintError(error);
      }
      throw new Error('Failed to create user.');
    }
  };

  const getAll = async (): Promise<IUser[]> => {
    return await User.find();
  };

  const findOneByUsernameOrId = async (
    query: Partial<UserUniqueIdentifier>,
  ): Promise<IUser> => {
    try {
      return (
        (await User.findOne(query))?.toObject() || throwUserNotFoundError()
      );
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      if (error instanceof Error) {
        handleMongooseCastObjectIdError(error);
      }
      throw new Error('Failed to find user by name or id.');
    }
  };

  const findById = async (id: string): Promise<IUser> => {
    try {
      return (await User.findById(id))?.toObject() || throwUserNotFoundError();
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      if (error instanceof Error) {
        handleMongooseCastObjectIdError(error);
      }
      throw new Error('Failed to find user by id.');
    }
  };

  const findByEmail = async (email: string): Promise<IUser> => {
    try {
      return (
        (await User.findOne({ email }))?.toObject() || throwUserNotFoundError()
      );
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      if (error instanceof Error) {
        handleMongooseCastObjectIdError(error);
      }
      throw new Error('Failed to find user by id.');
    }
  };

  const findByToken = async ({
    refreshToken,
  }: {
    refreshToken: string;
  }): Promise<IUser | null> => {
    try {
      return await User.findOne({ 'refreshToken.token': refreshToken });
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      if (error instanceof Error) {
        handleMongooseCastObjectIdError(error);
      }
      throw new Error('Failed to find user by token.');
    }
  };

  const isExisting = async (
    query: Partial<UserUniqueIdentifier>,
  ): Promise<IUser | null> => {
    return await User.findOne(query);
  };

  const updateById = async (
    id: string,
    query: Partial<IUserWithoutId>,
  ): Promise<IUser> => {
    try {
      return (
        (
          await User.findByIdAndUpdate(id, query, {
            new: true,
            runValidators: true,
          })
        )?.toObject() || throwUserNotFoundError()
      );
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      if (error instanceof Error) {
        handleMongooseUniqueConstraintError(error);
        handleMongooseCastObjectIdError(error);
      }
      throw new Error('Failed to update user.');
    }
  };

  const deleteById = async (id: string): Promise<IUser> => {
    try {
      return (
        (await User.findByIdAndDelete(id))?.toObject() ||
        throwUserNotFoundError()
      );
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      if (error instanceof Error) {
        handleMongooseCastObjectIdError(error);
      }
      throw new Error('Failed to delete user by id.');
    }
  };

  return Object.freeze({
    create,
    getAll,
    findOneByUsernameOrId,
    findById,
    findByEmail,
    findByToken,
    isExisting,
    updateById,
    deleteById,
  });
};

const throwUserNotFoundError = () => {
  throw new NotFoundError('User not found.');
};
