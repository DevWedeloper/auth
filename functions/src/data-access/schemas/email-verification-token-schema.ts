import { Schema, model } from 'mongoose';
import { IEmailVerificationToken } from '../../types/email-verification-token.type';

const emailVerificationTokenSchema: Schema<IEmailVerificationToken> =
  new Schema({
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value: string) => {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: 'Invalid email address',
      },
    },
    verificationCode: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
      expires: '5m',
      default: Date.now(),
    },
  });

export const EmailVerificationToken = model<IEmailVerificationToken>(
  'EmailVerificationToken',
  emailVerificationTokenSchema,
);
