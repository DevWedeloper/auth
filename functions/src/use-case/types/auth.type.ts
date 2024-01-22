export type getAutoLogoutAt = (refreshToken: string) => Promise<{
  expired: boolean;
}>;

export type getRole = (accessToken: string) => { role: string };

export type googleOAuthHandler = (
  oldRefreshToken: string | undefined,
  credential: string
) => Promise<{
  accessToken: string;
  refreshToken: string;
}>;

export type isLoggedIn = (accessToken: string | undefined) => void;

export type loggedInUser = (accessToken: string | undefined) => {
  userId: string;
  role: string;
};

export type login = (
  username: string,
  password: string,
  oldRefreshToken: string | undefined
) => Promise<{
  accessToken: string;
  refreshToken: string;
}>;

export type logout = (refreshToken: string | undefined) => Promise<void>;

export type refreshAccessToken = (refreshToken: string | undefined) => Promise<{
  accessToken: string;
  refreshToken: string;
}>;
