/** @type {import('@types/jest')} */

import fileTimer, { timeConvertor } from './fileTimer';

describe('File timer tests', () => {
  test('convert time from seconds to hours', () => {
    const timeInSeconds = 204;
    const timeInHours = '00:03:24';

    expect(timeConvertor(timeInSeconds)).toBe(timeInHours);
  });

  test('convert time from seconds to hours', () => {
    const timeInSeconds = 5750;
    const timeInHours = '01:35:50';

    expect(timeConvertor(timeInSeconds)).toBe(timeInHours);
  });

  test('generating time comparison', () => {
    const timeLength = 204.07;
    const currentTime = 180.22;
    const expectedOutput = '03:00 / 03:24'

    expect(fileTimer(currentTime, timeLength)).toBe(expectedOutput);
  });

  test('generating time comparison', () => {
    const currentTime = 2842;
    const timeLength = 6316;
    const expectedOutput = '00:47:22 / 01:45:16'

    expect(fileTimer(currentTime, timeLength)).toBe(expectedOutput);
  });
});