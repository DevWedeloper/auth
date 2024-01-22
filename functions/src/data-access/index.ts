import { connectToDatabase } from './connect-to-database';
import { User } from './schemas/user-schema';
import { makeUserDb } from './user-db';

const userSchemaWrapper = () => {
  connectToDatabase();
  return User;
};

export const userDb = makeUserDb({ User: userSchemaWrapper() });
