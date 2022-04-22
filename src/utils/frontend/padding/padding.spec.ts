/** @type {import('@types/jest')} */

import { addPadding, removePadding } from './padding';

describe('Padding tests', () => {
  test('Adding padding test', async () => {
    const text = 'test';
    const textWithPadding = addPadding(text, 8_000);
    expect(textWithPadding.length).toBe(8_000);
  })

  test('Remove padding test', async () => {
    const text = 'test';
    const textWithPadding = addPadding(text, 8_000);
    const textWithRemovedPadding = removePadding(textWithPadding);

    expect(textWithRemovedPadding.length).toBe(text.length);
  });
})