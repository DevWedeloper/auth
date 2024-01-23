import { IEmailVerificationToken } from '../types/email-verification-token.type';
import { NotFoundError } from '../utils/errors';
import { EmailVerificationTokenModel } from './types/data-access.type';
import {
  handleMongooseCastObjectIdError,
  handleMongooseUniqueConstraintError,
} from './utils/handle-mongoose-errors';

export const makeEmailVerificationTokenDb = ({
  EmailVerificationToken,
}: {
  EmailVerificationToken: EmailVerificationTokenModel;
}) => {
  const create = async (
    emailVerificationToken: IEmailVerificationToken,
  ): Promise<IEmailVerificationToken> => {
    try {
      return (
        await EmailVerificationToken.create(emailVerificationToken)
      ).toObject();
    } catch (error) {
      if (error instanceof Error) {
        handleMongooseUniqueConstraintError(error);
      }
      throw new Error('Failed to create email verification token.');
    }
  };

  const findByEmail = async (
    email: string,
  ): Promise<IEmailVerificationToken> => {
    try {
      return (
        (await EmailVerificationToken.findOne({ email }))?.toObject() ||
        throwEmailVerificationTokenNotFoundError()
      );
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      if (error instanceof Error) {
        handleMongooseCastObjectIdError(error);
      }
      throw new Error('Failed to find email verification token by email.');
    }
  };

  const isEmailExisting = async (
    email: string,
  ): Promise<IEmailVerificationToken | null> => {
    return (await EmailVerificationToken.findOne({ email })) || null;
  };

  const updateByEmail = async (
    email: string,
    query: Partial<IEmailVerificationToken>,
  ): Promise<IEmailVerificationToken> => {
    try {
      return (
        (
          await EmailVerificationToken.findOneAndUpdate({ email }, query, {
            new: true,
            runValidators: true,
          })
        )?.toObject() || throwEmailVerificationTokenNotFoundError()
      );
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      if (error instanceof Error) {
        handleMongooseUniqueConstraintError(error);
        handleMongooseCastObjectIdError(error);
      }
      throw new Error('Failed to update email verification token.');
    }
  };

  const deleteByEmail = async (
    email: string,
  ): Promise<IEmailVerificationToken> => {
    try {
      return (
        (
          await EmailVerificationToken.findOneAndDelete({ email })
        )?.toObject() || throwEmailVerificationTokenNotFoundError()
      );
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      if (error instanceof Error) {
        handleMongooseCastObjectIdError(error);
      }
      throw new Error('Failed to delete email verification token by email.');
    }
  };

  return Object.freeze({
    create,
    findByEmail,
    isEmailExisting,
    updateByEmail,
    deleteByEmail,
  });
};

const throwEmailVerificationTokenNotFoundError = () => {
  throw new NotFoundError('Email verification token not found.');
};
