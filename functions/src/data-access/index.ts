import { connectToDatabase } from './connect-to-database';
import { makeEmailVerificationTokenDb } from './email-verification-token-db';
import { makeResetPasswordTokenDb } from './reset-password-token-db';
import { EmailVerificationToken } from './schemas/email-verification-token-schema';
import { ResetPasswordToken } from './schemas/reset-password-token-schema';
import { User } from './schemas/user-schema';
import { makeUserDb } from './user-db';

const userSchemaWrapper = () => {
  connectToDatabase();
  return User;
};

const emailVerificationTokenSchemaWrapper = () => {
  connectToDatabase();
  return EmailVerificationToken;
};

const resetPasswordTokenSchemaWrapper = () => {
  connectToDatabase();
  return ResetPasswordToken;
};

export const userDb = makeUserDb({ User: userSchemaWrapper() });

export const emailVerificationTokenDb = makeEmailVerificationTokenDb({
  EmailVerificationToken: emailVerificationTokenSchemaWrapper(),
});

export const resetPasswordTokenDb = makeResetPasswordTokenDb({
  ResetPasswordToken: resetPasswordTokenSchemaWrapper(),
});
