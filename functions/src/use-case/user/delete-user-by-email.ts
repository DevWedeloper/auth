import { UserDb } from '../../data-access/types/data-access.type';
import { UnauthorizedError } from '../../utils/errors';
import { requiredParam } from '../../utils/validation-utils';
import { ComparePassword } from '../types/bcrypt.type';

export const makeDeleteUserByEmail = ({
  userDb,
  comparePassword,
}: {
  userDb: UserDb;
  comparePassword: ComparePassword;
}) => {
  const deleteUserByEmail = async (email: string, password: string) => {
    requiredParam(email, 'Email');
    requiredParam(password, 'Password');

    const user = await userDb.findByEmail(email);
    if (!comparePassword(password, user.password)) {
      throw new UnauthorizedError('Invalid password.');
    }

    await userDb.deleteById(user._id);
  };
  return deleteUserByEmail;
};
