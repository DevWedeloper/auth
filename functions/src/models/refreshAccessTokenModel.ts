import {
  IRefreshAccessToken,
  IRefreshAccessTokenWithoutId,
} from '../types/refreshAccessTokenType';
import { RefreshTokenUniqueIdentifier } from '../types/uniqueIdentifier';
import { RefreshToken } from './schemas/refreshAccessTokenSchema';

export const create = async (
  token: IRefreshAccessTokenWithoutId
): Promise<IRefreshAccessToken> => {
  return (await RefreshToken.create(token)).toObject();
};

export const findOneByToken = async (
  query: Partial<RefreshTokenUniqueIdentifier>
): Promise<IRefreshAccessToken> => {
  return (
    (await RefreshToken.findOne(query)) ||
    throwRefreshAccessTokenNotFoundError()
  );
};

export const deleteOneByToken = async (
  query: Partial<RefreshTokenUniqueIdentifier>
): Promise<{
  acknowledged: boolean;
  deletedCount: number;
}> => {
  return await RefreshToken.deleteOne(query);
};

export const isUnique = async ({
  userId,
}: {
  userId: string;
}): Promise<IRefreshAccessToken | null> => {
  return await RefreshToken.findOne({ userId });
};

export const isExisting = async (
  token: Partial<RefreshTokenUniqueIdentifier>
): Promise<IRefreshAccessToken | null> => {
  return await RefreshToken.findOne({ token });
};

export const updateById = async (
  id: string,
  query: Partial<IRefreshAccessTokenWithoutId>
): Promise<IRefreshAccessToken> => {
  return (
    (
      await RefreshToken.findByIdAndUpdate(id, query, {
        new: true,
        runValidators: true,
      })
    )?.toObject() || throwRefreshAccessTokenNotFoundError()
  );
};

const throwRefreshAccessTokenNotFoundError = () => {
  throw new Error('Refresh token not found.');
};
