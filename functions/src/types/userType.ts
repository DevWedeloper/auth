export type IUser = {
  _id: string;
  username: string;
  password: string;
  role: 'admin' | 'standard';
  refreshToken: string[];
};

export type IUserWithoutId = Omit<IUser, '_id'>;