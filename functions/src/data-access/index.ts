import { connectToDatabase } from './connect-to-database';
import { makeEmailVerificationTokenDb } from './email-verification-token-db';
import { EmailVerificationToken } from './schemas/email-verification-token-schema';
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

export const userDb = makeUserDb({ User: userSchemaWrapper() });

export const emailVerificationTokenDb = makeEmailVerificationTokenDb({
  EmailVerificationToken: emailVerificationTokenSchemaWrapper(),
});
