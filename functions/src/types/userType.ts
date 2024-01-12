export type IUser = {
  _id: string;
  username: string;
  password: string;
  role: 'admin' | 'standard';
  refreshToken: { token: string; expiresAt: Date }[];
};

export type IUserWithoutId = Omit<IUser, '_id'>;
