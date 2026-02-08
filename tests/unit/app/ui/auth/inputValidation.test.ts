import { expect, describe, test } from 'vitest';
import {
  isValidEmail,
  isValidPassword,
} from '../../../../../src/app/ui/auth/inputValidation.ts';

describe('Check if password validation succeeds', (): void => {
  test('Should return true when password validation succeeds', (): void => {
    expect(isValidPassword('ValidPassword')).toBe(true);
  });
});

describe('Check if password validation fails', (): void => {
  test('Should return false when password validation fails', (): void => {
    expect(isValidPassword('Invalid')).toBe(false);
  });
});

describe('check if email validation fails', (): void => {
  test('Should return false when email validation fails', (): void => {
    expect(isValidEmail('testUser@gmail.com')).toBe(false);
  });
});

describe('check if email validation succeeds', (): void => {
  test('Should return true when email validation succeeds', (): void => {
    expect(isValidEmail('testUser@stud.noroff.no')).toBe(true);
  });
});
