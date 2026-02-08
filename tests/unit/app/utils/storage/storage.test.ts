import { expect, describe, test, beforeEach } from 'vitest';
import { saveKey } from '../../../../../src/app/utils/storage/storage';

describe('Storage function for saving api key', (): void => {
  beforeEach((): void => {
    localStorage.clear();
  });

  describe(saveKey, (): void => {
    test('saves the APi key to localstorage', (): void => {
      const testKey = 'testKey';
      const testValue = 'my-secret-API-key';
      saveKey(testKey, testValue);
      expect(localStorage.getItem('testKey')).toBe(testValue);
    });
  });
});
