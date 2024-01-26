import { UserDb } from '../../data-access/types/data-access.type';
import { requiredParam } from '../../utils/validation-utils';

export const makeIsEmailUnique = ({ userDb }: { userDb: UserDb }) => {
  const isEmailUnique = async (email: string) => {
    requiredParam(email, 'Email');
    const user = await userDb.isExisting({ email });
    if (user) {
      return 'Email is not unique';
    } else {
      return 'Email is unique';
    }
  };
  return isEmailUnique;
};
