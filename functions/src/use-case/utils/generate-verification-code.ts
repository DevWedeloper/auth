export const generateVerificationCode = () => {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  const secureCode = String(array[0] % 1000000).padStart(6, '0');
  return secureCode;
};
