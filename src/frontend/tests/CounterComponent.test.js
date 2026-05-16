/**
 * @jest-environment jsdom
 */

import {
  beforeAll,
  beforeEach,
  describe,
  expect,
  jest,
  test
} from "@jest/globals";
import DomUtils from "./utils/dom-utils.js";

beforeEach(() => {
  expect.hasAssertions();
});

describe('When ApiService returns initial value 1, increments to 2 and decrements to 3', () => {
  const mockGetValue = jest.fn().mockResolvedValue(1);
  const mockIncrement = jest.fn().mockResolvedValue(2);
  const mockDecrement = jest.fn().mockResolvedValue(3);

  beforeAll(() => {
    jest.unstable_mockModule('../api-service.js', () => ({
      ApiService: jest.fn().mockImplementation(() => ({
        getValue: mockGetValue,
        increment: mockIncrement,
        decrement: mockDecrement
      }))
    }))
  });

  test('CounterComponent should display initial value 1', async () => {
    const counterComponentModule = await import('../components/counter/component.js');
    const counter = new counterComponentModule.CounterComponent();
    
    document.body.append(counter);

    await DomUtils.update();

    const valueElement = counter.shadowRoot.querySelector('#counter-value');
    expect(valueElement.innerHTML).toBe("1");
  });
})