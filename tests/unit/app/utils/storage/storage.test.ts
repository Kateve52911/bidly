import { expect, describe, test, beforeEach } from "vitest";
import { saveKey } from '../../../../../src/app/utils/storage/storage';

describe("Storage function for saving api key", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe(saveKey, () => {
    test("saves the APi key to localstorage", () => {
      const testKey = "testKey";
      const testValue = "my-secret-API-key"
      saveKey(testKey, testValue);
      expect(localStorage.getItem("testKey")).toBe(testValue);
    })
  })
})
