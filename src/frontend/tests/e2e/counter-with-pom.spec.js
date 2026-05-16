import { expect, test } from './fixtures/test.js';

test('Test getValue with POM', async ({ counterPage }) => {
  const counterValue = counterPage.counterValue();
  await expect(counterValue).toContainText('0');
});

test('Test increment and decrement with POM', async ({ counterPage }) => {
  const counterValue = counterPage.counterValue();
  await expect(counterValue).toContainText('0');
  
  await counterPage.incrementCounter();
  await expect(counterValue).toContainText('1');

  await counterPage.decrementCounter();
  await expect(counterValue).toContainText('0');
});

test('Aria snapshot with POM', async ({ counterPage }) => {
  await expect(counterPage.page.locator('html')).toMatchAriaSnapshot(`
    - document:
      - 'heading "Counter: 0" [level=2]'
      - button "Increment"
      - button "Decrement"
      - paragraph: "isPrime: false"
  `);
});