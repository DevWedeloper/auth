import { IRefreshAccessToken } from './refreshAccessTokenType';

export type RefreshTokenUniqueIdentifier = Pick<IRefreshAccessToken, 'token'>;

export type UserUniqueIdentifier = {
  _id: string;
  username: string;
};
