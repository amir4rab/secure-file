/** @type {import('@types/jest')} */

import { getFormat, readableSize } from './fileUtils';

describe('File manager tests', () => {
  test('getFormat tests', async () => {
    expect(getFormat('test1.mp3')).toBe('mp3')
    expect(getFormat('test1.test.sets.mp3')).toBe('mp3')
    expect(getFormat('test1.zzx.as.mp3')).toBe('mp3')
    expect(getFormat('test1.mo.as.mp3')).toBe('mp3')
  })

  test('readableSize tests', async () => {
    expect(readableSize(10_000)).toBe('10 KB');
    expect(readableSize(1_010_000)).toBe('1.01 MB');
    expect(readableSize(1_000_910_000)).toBe('1 GB');
  });
})