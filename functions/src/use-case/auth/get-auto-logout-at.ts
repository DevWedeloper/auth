import { UserDb } from '../../data-access/types/data-access.type';
import { UnauthorizedError } from '../../utils/errors';

export const makeGetAutoLogoutAt = ({ userDb }: { userDb: UserDb }) => {
  const getAutoLogoutAt = async (refreshToken: string) => {
    if (!refreshToken) {
      throw new UnauthorizedError('Missing token.');
    }

    const user = await userDb.findByToken({ refreshToken });
    if (!user) {
      throw new UnauthorizedError('User not found.');
    }

    const autoLogoutAtValue = user.refreshToken
      .filter((rt) => rt.token === refreshToken)
      .map((rt) => rt.autoLogoutAt);
    const currentDate = new Date();

    if (autoLogoutAtValue[0] < currentDate) {
      const newRefreshTokenArray = user.refreshToken.filter(
        (rt) => rt.token !== refreshToken,
      );
      await userDb.updateById(user._id, {
        refreshToken: [...newRefreshTokenArray],
      });

      // TODO: Place the commented functions on the endpoint when sessionExpired is true
      // clearRefreshAndAccessTokenCookies(res);
      // throw new UnauthorizedError('Session expired.');
      return { expired: true };
    }
    return { expired: false };
  };
  return getAutoLogoutAt;
};
