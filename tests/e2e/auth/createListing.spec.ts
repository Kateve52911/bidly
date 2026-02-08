import { expect, test } from '@playwright/test';

test.describe('Create Listing', (): void => {
  test('user can create a new listing', async ({ page }) => {
    await page.goto('/login.html');
    await page
      .locator('input[name="email"]')
      .fill(process.env.TEST_USER_EMAIL!);
    await page
      .locator('input[name="password"]')
      .fill(process.env.TEST_USER_PASSWORD!);
    await page.locator('form#login-form button[type="submit"]').click();
    await page.waitForURL(/profile\.html/);

    await page.goto('/new-listing.html');

    const listingTitle = `Test Auction ${Date.now()}`;
    await page.locator('input[name="title"]').fill(listingTitle);
    await page.locator('input[name="description"]').fill('Test description');
    await page
      .locator('input[name="imageUrl"]')
      .fill(
        'https://unsplash.com/photos/white-and-brown-floral-textile-0MnpfQIUO5c',
      );
    await page
      .locator('input[name="imageAlt"]')
      .fill('A stack of hand-knitted sweaters');

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const endDate: string = tomorrow.toISOString().slice(0, 16);
    await page.locator('input[name="endingDate"]').fill(endDate);

    await page.locator('form#new-listing-form button[type="submit"]').click();

    await page.waitForURL(/index/, { timeout: 5000 });

    await expect(page).toHaveURL(/index/);
  });
});
