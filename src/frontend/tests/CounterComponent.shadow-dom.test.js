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

import '@testing-library/jest-dom'
import { fireEvent, waitFor } from "@testing-library/dom";
import { findByShadowText, getByShadowText } from "shadow-dom-testing-library";

beforeEach(() => {
  expect.hasAssertions();
});

describe('When ApiService returns initial value 10, increments to 20', () => {
  const mockGetValue = jest.fn().mockResolvedValue(10);
  const mockIncrement = jest.fn().mockResolvedValue(20);
  const mockDecrement = jest.fn();

  beforeAll(() => {
    jest.unstable_mockModule('../api-service.js', () => ({
      ApiService: jest.fn().mockImplementation(() => ({
        getValue: mockGetValue,
        increment: mockIncrement,
        decrement: mockDecrement
      }))
    }))
  });

  beforeEach(() => {
    // mockGetValue.mockClear();
    // mockIncrement.mockClear();
    // mockDecrement.mockClear();
    jest.clearAllMocks();
  })

  test('CounterComponent should display initial value 10', async () => {
    const counterComponentModule = await import('../components/counter/component.js');
    const counter = new counterComponentModule.CounterComponent();
    
    document.body.append(counter);

    const incrementButton = await findByShadowText(counter, "Increment");
    expect(incrementButton).toBeInTheDocument();

    const valueElement = await findByShadowText(counter, /counter:/i);
    expect(valueElement).toHaveTextContent("Counter: 10");

    expect(mockGetValue).toHaveBeenCalledTimes(1);
    expect(mockIncrement).toHaveBeenCalledTimes(0);
    expect(mockDecrement).toHaveBeenCalledTimes(0);
  });

  test('CounterComponent should display incremented value 20', async () => {
    const counterComponentModule = await import('../components/counter/component.js');
    const counter = new counterComponentModule.CounterComponent();
    
    document.body.append(counter);

    const incrementButton = await findByShadowText(counter, "Increment");
    expect(incrementButton).toBeInTheDocument();
    // incrementButton.click();
    fireEvent.click(incrementButton);

    await waitFor(() => {
      const valueElement = getByShadowText(counter, /counter:/i);
      expect(valueElement).toHaveTextContent("Counter: 20");
    })

    expect(mockGetValue).toHaveBeenCalledTimes(1);
    expect(mockIncrement).toHaveBeenCalledTimes(1);
    expect(mockDecrement).toHaveBeenCalledTimes(0);

    expect(counter).toMatchSnapshot();
    expect(counter.shadowRoot).toMatchSnapshot();
  });
})