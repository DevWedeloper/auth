export const calculateExpiresAt = () => {
  const parseDuration = (duration: string): number | undefined => {
    const match = duration.match(/^(\d+)([smhd])$/);
    if (!match) {
      return undefined;
    }
  
    const value = parseInt(match[1]);
    const unit = match[2];
  
    switch (unit) {
      case 's':
        return value * 1000;
      case 'm':
        return value * 60 * 1000; 
      case 'h':
        return value * 60 * 60 * 1000;
      case 'd':
        return value * 24 * 60 * 60 * 1000;
      default:
        return undefined;
    }
  };
  
  const expiresIn = process.env.REFRESH_TOKEN_EXPIRATION as string;
  const expiresInMilliseconds = parseDuration(expiresIn);

  if (expiresInMilliseconds === undefined) {
    throw new Error('Invalid duration format');
  }

  return new Date(Date.now() + expiresInMilliseconds);
};
