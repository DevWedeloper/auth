import { UserDb } from '../../data-access/types/data-access.type';

export const makeGetAllUsers = ({ userDb }: { userDb: UserDb }) => {
  const getAllUsers = async () => {
    return userDb.getAll();
  };
  return getAllUsers;
};
