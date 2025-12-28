import { expect, describe, test } from 'vitest';
import {
  isValidEmail,
  isValidPassword,
} from '../../../../../src/app/ui/auth/inputValidation.ts';

describe('Check if password validation succeeds', () => {
  test('Should return true when password validation succeeds', () => {
    expect(isValidPassword('ValidPassword')).toBe(true);
  });
});

describe('Check if password validation fails', () => {
  test('Should return false when password validation fails', () => {
    expect(isValidPassword('Invalid')).toBe(false);
  });
});

describe('check if email validation fails', () => {
  test('Should return false when email validation fails', () => {
    expect(isValidEmail('testUser@gmail.com')).toBe(false);
  });
});

describe('check if email validation succeeds', () => {
  test('Should return true when email validation succeeds', () => {
    expect(isValidEmail('testUser@stud.noroff.no')).toBe(true);
  });
});
