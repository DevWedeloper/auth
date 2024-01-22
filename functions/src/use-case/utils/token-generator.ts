import jwt from 'jsonwebtoken';

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as string;
const accessTokenExpiration = process.env.ACCESS_TOKEN_EXPIRATION as string;
const refreshTokenExpiration = process.env.REFRESH_TOKEN_EXPIRATION as string;

export const generateAccessToken = ({
  userId,
  username,
  role,
}: {
  userId: string;
  username: string;
  role: string;
}): string => {
  return jwt.sign({ userId, username, role }, accessTokenSecret, {
    expiresIn: `${accessTokenExpiration}`,
  });
};

export const generateRefreshToken = ({
  userId,
  username,
  role,
}: {
  userId: string;
  username: string;
  role: string;
}): string => {
  return jwt.sign({ userId, username, role }, refreshTokenSecret, {
    expiresIn: `${refreshTokenExpiration}`,
  });
};
