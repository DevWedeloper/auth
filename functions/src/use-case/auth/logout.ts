import { UserDb } from '../../data-access/types/data-access.type';

export const makeLogout = ({ userDb }: { userDb: UserDb }) => {
  const logout = async (refreshToken: string | undefined) => {
    if (!refreshToken) {
      return;
    }

    const user = await userDb.findByToken({ refreshToken });
    if (!user) {
      return;
    }

    const newRefreshTokenArray = user.refreshToken.filter(
      (rt) => rt.token !== refreshToken,
    );

    await userDb.updateById(user._id, {
      refreshToken: [...newRefreshTokenArray],
    });
  };
  return logout;
};
