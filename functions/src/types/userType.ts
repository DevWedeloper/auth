export type IUser = {
  _id: string;
  email: string;
  username: string | null;
  password?: string;
  role: 'admin' | 'standard';
  refreshToken: { token: string; expiresAt: Date }[];
};

export type IUserWithoutId = Omit<IUser, '_id'>;
