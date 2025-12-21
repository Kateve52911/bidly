import { expect, describe, test } from 'vitest';
import { checkPassword } from '../../../../../src/app/ui/auth/passwordValidation';

describe('Check if password validation succeeds', () => {
  test('Should return true when password validation succeeds', () => {
    expect(checkPassword('ValidPassword')).toBe(true);
  });
});

describe('Check if password validation fails', () => {
  test('Should return false when password validation fails', () => {
    expect(checkPassword('Invalid')).toBe(false);
  });
});
