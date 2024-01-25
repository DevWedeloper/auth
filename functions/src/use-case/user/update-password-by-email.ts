import { UserDb } from '../../data-access/types/data-access.type';
import { makeUser } from '../../user/user';
import { UnauthorizedError } from '../../utils/errors';
import { requiredParam } from '../../utils/validation-utils';
import { ComparePassword, HashPassword } from '../types/bcrypt.type';

export const makeUpdatePasswordByEmail = ({
  userDb,
  comparePassword,
  hash,
}: {
  userDb: UserDb;
  comparePassword: ComparePassword;
  hash: HashPassword;
}) => {
  const updatePasswordByEmail = async (
    email: string,
    password: string,
    newPassword: string,
  ) => {
    requiredParam(email, 'Email');
    requiredParam(password, 'Password');
    requiredParam(newPassword, 'New Password');

    const user = await userDb.findByEmail(email);
    if (!comparePassword(password, user.password || '')) {
      throw new UnauthorizedError('Invalid password.');
    }

    const updatedUser = makeUser({ ...user, password: newPassword });
    const hashedPassword = await hash(newPassword, 10);

    await userDb.updateById(user._id, {
      ...updatedUser,
      password: hashedPassword,
    });
  };
  return updatePasswordByEmail;
};
