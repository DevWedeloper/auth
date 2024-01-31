import {
  ResetPasswordTokenDb,
  UserDb,
} from '../../data-access/types/data-access.type';
import { makeUser } from '../../user/user';
import { requiredParam } from '../../utils/validation-utils';
import { HashPassword } from '../types/bcrypt.type';

export const makeResetPassword = ({
  userDb,
  resetPasswordTokenDb,
  hash,
}: {
  userDb: UserDb;
  resetPasswordTokenDb: ResetPasswordTokenDb;
  hash: HashPassword;
}) => {
  const resetPassword = async (token: string, password: string) => {
    requiredParam(token, 'Token');
    requiredParam(password, 'Password');

    const retrievedToken = await resetPasswordTokenDb.findByToken(token);

    const user = await userDb.findByEmail(retrievedToken.email);

    const hashedPassword = await hash(password, 10);

    const updatedUser = makeUser({ ...user, password: hashedPassword });

    await resetPasswordTokenDb.deleteByEmail(retrievedToken.email);

    await userDb.updateById(user._id, updatedUser);
  };
  return resetPassword;
};
