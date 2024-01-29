export const generateResetPasswordToken = () => {
  const array = new Uint32Array(4);
  crypto.getRandomValues(array);
  const secureCode = Array.from(array)
    .map((element) => element.toString(16).padStart(8, '0'))
    .join('');
  return secureCode;
};
