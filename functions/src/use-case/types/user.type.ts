import { IUser, IUserWithoutId } from '../../types/user.type';

export type createUser = (user: IUserWithoutId) => Promise<IUser>;
export type getAllUsers = () => Promise<IUser[]>;
export type getUserById = (id: string) => Promise<IUser>;
