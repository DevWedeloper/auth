import { Response } from 'express';

interface TokenObject {
  accessToken: string;
  refreshToken: string;
}

export const setRefreshAndAccessTokenCookies = (
  res: Response,
  tokens: TokenObject,
): void => {
  const { accessToken, refreshToken } = tokens;
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
  const expirationDate = new Date(Date.now() + oneDayInMilliseconds);

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    expires: expirationDate,
  });
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    expires: expirationDate,
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
