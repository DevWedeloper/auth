import { IResetPasswordToken } from '../types/reset-password-token.type';
import { NotFoundError } from '../utils/errors';
import { ResetPasswordTokenModel } from './types/data-access.type';
import {
  handleMongooseCastObjectIdError,
  handleMongooseUniqueConstraintError,
} from './utils/handle-mongoose-errors';

export const makeResetPasswordTokenDb = ({
  ResetPasswordToken,
}: {
  ResetPasswordToken: ResetPasswordTokenModel;
}) => {
  const create = async (
    resetPasswordToken: IResetPasswordToken,
  ): Promise<IResetPasswordToken> => {
    try {
      return (await ResetPasswordToken.create(resetPasswordToken)).toObject();
    } catch (error) {
      if (error instanceof Error) {
        handleMongooseUniqueConstraintError(error);
      }
      throw new Error('Failed to create reset password token.');
    }
  };

  const findByToken = async (token: string): Promise<IResetPasswordToken> => {
    try {
      return (
        (await ResetPasswordToken.findOne({ token }))?.toObject() ||
        throwResetPasswordTokenNotFoundError()
      );
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      if (error instanceof Error) {
        handleMongooseCastObjectIdError(error);
      }
      throw new Error('Failed to find reset password token by token.');
    }
  };

  const isEmailExisting = async (
    email: string,
  ): Promise<IResetPasswordToken | null> => {
    return (await ResetPasswordToken.findOne({ email })) || null;
  };

  const updateByEmail = async (
    email: string,
    query: Partial<IResetPasswordToken>,
  ): Promise<IResetPasswordToken> => {
    try {
      return (
        (
          await ResetPasswordToken.findOneAndUpdate({ email }, query, {
            new: true,
            runValidators: true,
          })
        )?.toObject() || throwResetPasswordTokenNotFoundError()
      );
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      if (error instanceof Error) {
        handleMongooseUniqueConstraintError(error);
        handleMongooseCastObjectIdError(error);
      }
      throw new Error('Failed to update reset password token.');
    }
  };

  const deleteByEmail = async (email: string): Promise<IResetPasswordToken> => {
    try {
      return (
        (await ResetPasswordToken.findOneAndDelete({ email }))?.toObject() ||
        throwResetPasswordTokenNotFoundError()
      );
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      if (error instanceof Error) {
        handleMongooseCastObjectIdError(error);
      }
      throw new Error('Failed to delete reset password token by email.');
    }
  };

  return Object.freeze({
    create,
    findByToken,
    isEmailExisting,
    updateByEmail,
    deleteByEmail,
  });
};

const throwResetPasswordTokenNotFoundError = () => {
  throw new NotFoundError('Reset password token not found.');
};
