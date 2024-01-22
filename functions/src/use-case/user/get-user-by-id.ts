import { UserDb } from '../../data-access/types/data-access.type';
import { requiredParam } from '../../utils/validation-utils';

export const makeGetUserById = ({ userDb }: { userDb: UserDb }) => {
  const getUserById = async (id: string) => {
    requiredParam(id, 'Id');
    return userDb.findById(id);
  };
  return getUserById;
};
