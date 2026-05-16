import { expect } from '@playwright/test';

export class CounterPage {
  constructor(page, dockerSetupInfo) {
    this.page = page;
    this.dockerSetupInfo = dockerSetupInfo;

    // Elements are rendered inside nested shadow roots (<my-app> -> <my-counter>),
    // so use a deep selector to pierce shadow DOM and locate the nodes.
    const deep = 'my-app >>> my-counter >>> ';
    this.incrementButton = this.page.locator(`${deep}button#increment`);
    this.decrementButton = this.page.locator(`${deep}button#decrement`);
    this.counterValueInfo = this.page.locator(`${deep}[data-testid="counter-value"]`);
    this.isPrimeInfo = this.page.locator(`${deep}[data-testid="is-prime"]`);

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
