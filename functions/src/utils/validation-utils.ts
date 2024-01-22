import { InvalidPropertyError, RequiredParameterError } from './errors';

export const requiredParam = (
  value: string | number | boolean | object,
  paramName: string
) => {
  const message = `${paramName} is required.`;
  if (!value) {
    throw new RequiredParameterError(message);
  }
};

export const validateNumberRange = (
  value: number,
  min: number,
  max: number,
  paramName: string
) => {
  const message = `${paramName} must be between ${min} and ${max}.`;
  if (value < min || value > max) {
    throw new InvalidPropertyError(message);
  }
};

export const validateStringType = (value: string, paramName: string) => {
  const message = `${paramName} must be a string.`;
  if (typeof value !== 'string') {
    throw new InvalidPropertyError(message);
  }
};

export const validateNumberType = (value: number, paramName: string) => {
  const message = `${paramName} must be a number.`;
  if (typeof value !== 'number') {
    throw new InvalidPropertyError(message);
  }
};

export const validateDateType = (value: Date, paramName: string) => {
  const message = `${paramName} must be a valid date.`;
  if (!(value instanceof Date) || isNaN(value.getTime())) {
    throw new InvalidPropertyError(message);
  }
};

export const validateAlphanumericUnderscore = (
  value: string,
  paramName: string
) => {
  const pattern = /^[A-Za-z0-9_]*$/;
  const message = `${paramName} must only contain letters, numbers, and underscore.`;
  if (!pattern.test(value)) {
    throw new InvalidPropertyError(message);
  }
};

export const validateEmail = (value: string, paramName: string) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const message = `${paramName} is not a valid email address.`;
  if (!pattern.test(value)) {
    throw new InvalidPropertyError(message);
  }
};

export const validatePassword = (value: string) => {
  const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  const message =
    'Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, and one digit.';
  if (!pattern.test(value)) {
    throw new InvalidPropertyError(message);
  }
};

export const validateRole = (value: string) => {
  const validRoles = ['admin', 'standard'];
  const message = `Incorrect role: ${value}, should be either 'admin' or 'standard'.`;

  validateStringType(value, value);

  if (!validRoles.includes(value)) {
    throw new InvalidPropertyError(message);
  }
};

export const validatePositiveNumber = (value: number, paramName: string) => {
  const message = `${paramName} must be a positive number.`;
  if (typeof value !== 'number' || value <= 0) {
    throw new InvalidPropertyError(message);
  }
};

export const validateSortOrder = (sortOrder: string, paramName: string) => {
  const validSortOrders = ['asc', 'desc'];
  const message = `${paramName} should be either 'asc' or 'desc'.`;
  if (!validSortOrders.includes(sortOrder)) {
    throw new InvalidPropertyError(message);
  }
};
