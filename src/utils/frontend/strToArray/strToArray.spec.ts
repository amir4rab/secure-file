/** @type {import('@types/jest')} */

import strToArray from './strToArray';

describe('StrToArray tests', () => {
  test('String to array conversion test', async () => {
    const text = '7ac10003b79d4e47d180d9fbabe0ba8eb702e78a8a971eede3e08e20a6b52b92'; // length 64
    const array = strToArray(text);

    expect(array.length).toBe(8);
    expect(array.toString()).toBe([ '7ac10003', 'b79d4e47', 'd180d9fb','abe0ba8e', 'b702e78a','8a971eed','e3e08e20', 'a6b52b92' ].toString());
  })
})