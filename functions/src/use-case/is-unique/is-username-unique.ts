import { UserDb } from '../../data-access/types/data-access.type';
import { requiredParam } from '../../utils/validation-utils';

export const makeIsUsernameUnique = ({ userDb }: { userDb: UserDb }) => {
  const isUsernameUnique = async (username: string) => {
    requiredParam(username, 'Username');
    const user = await userDb.isExisting({ username });
    if (user) {
      return 'Username is not unique';
    } else {
      return 'Username is unique';
    }
  };
  return isUsernameUnique;
};
