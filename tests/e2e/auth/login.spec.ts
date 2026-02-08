import { expect, test } from '@playwright/test';

test.describe('Login', (): void => {
  test('user can login with valid credentials', async ({
    page,
  }): Promise<void> => {
    await page.goto('/login.html');

    await page
      .locator('input[name="email"]')
      .fill(process.env.TEST_USER_EMAIL!);
    await page
      .locator('input[name="password"]')
      .fill(process.env.TEST_USER_PASSWORD!);

    await page.locator('form#login-form button[type="submit"]').click();

    await page.waitForURL(/profile\.html/, { timeout: 5000 });

    await expect(page.locator('#logoutButton')).toBeVisible();
  });

  test('an error message is shown with invalid credentials', async ({
    page,
  }): Promise<void> => {
    await page.goto('/login.html');

    await page
      .locator('input[name="email"]')
      .fill(process.env.TEST_USER_EMAIL!);
    await page.locator('input[name="password"]').fill('WrongPassword123!');

    await page.locator('form#login-form button[type="submit"]').click();

    await expect(page.locator('.alert-danger')).toBeVisible();
    await expect(page.locator('.alert-danger')).toContainText('Login failed');
  });
});
