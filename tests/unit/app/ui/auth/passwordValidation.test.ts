import { expect, describe, test } from 'vitest';
import { isValidPassword } from '../../../../../src/app/ui/auth/inputValidation.ts';

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
