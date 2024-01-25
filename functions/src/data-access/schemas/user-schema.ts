import { Schema, model } from 'mongoose';
import { IUserWithoutId } from '../../types/user.type';

const userSchema: Schema<IUserWithoutId> = new Schema({
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
    index: true,
  },
  username: {
    type: String,
    minlength: 6,
    maxlength: 20,
    match: /^[A-Za-z0-9_]*$/,
    index: true,
  },
  password: {
    type: String,
    minlength: 8,
    validate: {
      validator: (value: string) => {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value);
      },
      message:
        'Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, and one digit.',
    },
  },
  role: { type: String, enum: ['admin', 'standard'], default: 'standard' },
  refreshToken: {
    type: [
      {
        token: {
          type: String,
          index: true,
        },
        expiresAt: {
          type: Date,
        },
        autoLogoutAt: {
          type: Date,
        },
      },
    ],
  },
});

export const User = model<IUserWithoutId>('User', userSchema);
