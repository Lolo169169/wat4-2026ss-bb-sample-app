import { afterAll, beforeAll, jest, test } from "@jest/globals";
import { CounterModel } from "../components/counter/model.js";
import DomUtils from "./utils/dom-utils.js";

beforeAll(() => {
  jest.useFakeTimers();
})

afterAll(() => {
  jest.useRealTimers();
});

test('Model notifies subscribers', async () => {
  // arrange
  const apiService = {
    getValue: jest.fn().mockResolvedValue(42),
  };
  const subscribeFn = jest.fn();

  const model = new CounterModel(apiService);
  model.subscribe(subscribeFn);

  // act
  model.initialize();
  // await Promise.resolve();
  // await DomUtils.update();
  // await jest.runAllTimersAsync(); // all macro-tasks
  await jest.runAllTicks(); // all micro-tasks

  // assert
  await expect(subscribeFn).toHaveBeenCalledTimes(1);
});