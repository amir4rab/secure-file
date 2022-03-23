/** @type {import('@types/jest')} */
import { render, screen } from '@testing-library/react';

import OpenSource from './index';

describe('Open Source component tests', () => {
  beforeEach(() => {
    render(<OpenSource />);
  });

  it('have title text' , () => {
    const title = screen.getByText('Secure File is Open Source');
    expect(title).toBeInTheDocument;
  });

  it('have license link', () => {
    const link = screen.getByTestId('gplLink');
    expect(link).toBeInTheDocument;
  })

  it('have github link', () => {
    const link = screen.getByTestId('githubLink');
    expect(link).toBeInTheDocument;
  })
})