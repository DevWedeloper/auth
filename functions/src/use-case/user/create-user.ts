import { UserDb } from '../../data-access/types/data-access.type';
import { IUserWithoutId } from '../../types/user.type';
import { makeUser } from '../../user/user';
import { RequiredParameterError } from '../../utils/errors';
import { requiredParam } from '../../utils/validation-utils';
import { HashPassword } from '../types/bcrypt.type';

export const makeCreateUser = ({
  userDb,
  hash,
}: {
  userDb: UserDb;
  hash: HashPassword;
}) => {
  const createUser = async (user: IUserWithoutId) => {
    requiredParam(user, 'User');
    if (!user.password) {
      throw new RequiredParameterError('Password is required.');
    }

    // TODO: Send tokens

    makeUser(user);
    const hashedPassword = await hash(user.password, 10);
    return userDb.create({
      ...user,
      password: hashedPassword,
    });
  };
  return createUser;
};
