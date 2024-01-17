import { Response } from 'express';

interface TokenObject {
  accessToken: string;
  refreshToken: string;
}

export const setRefreshAndAccessTokenCookies = (
  res: Response,
  tokens: TokenObject
): void => {
  const { accessToken, refreshToken } = tokens;
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });
};

export const clearRefreshAndAccessTokenCookies = (res: Response): void => {
  res.clearCookie('accessToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });
};
