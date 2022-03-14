/** @type {import('@types/jest')} */

import { render, screen } from '@testing-library/react';
import MobileNavbar from './mobileNavbar';

describe('Web header tests', () => {
  beforeEach(() => {
    render(<MobileNavbar/>)
  })

  it('Links should be included', async () => {
    const links = screen.getAllByRole('link');
    expect(links.length).toBe(3);
  })
})