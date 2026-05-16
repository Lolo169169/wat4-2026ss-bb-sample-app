import { expect } from '@playwright/test';

export class CounterPage {
  constructor(page, dockerSetupInfo) {
    this.page = page;
    this.dockerSetupInfo = dockerSetupInfo;

    this.incrementButton = this.page.getByRole('button', { name: 'Increment' });
    this.decrementButton = this.page.getByRole('button', { name: 'Decrement' });
    this.counterValueInfo = this.page.getByTestId('counter-value');
    this.isPrimeInfo = this.page.getByTestId('is-prime');

    this.frontendUrl = `http://localhost:${this.dockerSetupInfo.frontendPort}/`;
    this.backendUrl = `http://localhost:${this.dockerSetupInfo.backendPort}/`;
  }

  async waitForCounterValueFetched() {
    const responsePromise = this.page.waitForResponse(/\/counter/);

    await this.page.goto(this.frontendUrl);

    const response = await responsePromise;
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
  }

  async incrementCounter() {
    const responsePromise = this.page.waitForResponse(/\/counter\/increment/);
    await this.incrementButton.click();
    return responsePromise;
  }

  async decrementCounter() {
    const responsePromise = this.page.waitForResponse(/\/counter\/decrement/);
    await this.decrementButton.click();
    return responsePromise;
  }

  counterValue() {
    return this.counterValueInfo;
  }

  isPrime() {
    return this.isPrimeInfo;
  }
}
