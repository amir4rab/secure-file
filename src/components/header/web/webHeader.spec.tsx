/** @type {import('@types/jest')} */

import { render, screen } from '@testing-library/react';
import WebHeader from './webHeader';

describe('Web header tests', () => {
  beforeEach(() => {
    render(<WebHeader height={60} />)
  })

  it('should include the title of the website', async () => {
    const title = screen.getByText('Secure File');
    expect(title).toBeInTheDocument;
  })

  it('Links should be included', async () => {
    const links = screen.getAllByRole('link');
    expect(links.length).toBe(3);
  })
})