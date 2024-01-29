import { Schema, model } from 'mongoose';
import { IResetPasswordToken } from '../../types/reset-password-token.type';

const resetPasswordTokenSchema: Schema<IResetPasswordToken> = new Schema({
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
  token: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    required: true,
    expires: '5m',
    default: Date.now(),
  },
});

export const ResetPasswordToken = model<IResetPasswordToken>(
  'ResetPasswordToken',
  resetPasswordTokenSchema,
);
