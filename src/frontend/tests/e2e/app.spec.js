// import test, { expect } from "@playwright/test";

// test.describe('When loading frontend home page', () => {
//   test.beforeEach(async ({ page }) => {
//     const responsePromise = page.waitForResponse(/\/counter/);

//     await page.goto('http://localhost:3000/');

//     const response = await responsePromise;
//     expect(response.status()).toBe(200);
//     expect(response.ok()).toBeTruthy();
//   });

//   test('should display main page elements', async ({ page }) => {
//     await expect(page).toHaveURL(/localhost:3000/, { timeout: 2000 });

//     const body = page.locator('body');
//     await expect(body).toBeVisible();
//     await expect(page.getByTestId('counter-value')).toContainText('0');
//   });

//   test('should increment and decrement', async ({ page }) => {
//     await page.getByRole('button', { name: 'Increment' }).click();
//     await expect(page.getByTestId('counter-value')).toContainText('1');

//     await page.getByRole('button', { name: 'Decrement' }).click();
//     await expect(page.getByTestId('counter-value')).toContainText('0');
//   });
// });
