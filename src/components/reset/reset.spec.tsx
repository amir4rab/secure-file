/** @type {import('@types/jest')} */
import { render, screen } from '@testing-library/react';

import Reset from './reset';

describe('Reset component tests', () => {
  beforeEach(() => {
    render(<Reset />);
  });

  it('have title text' , () => {
    const title = screen.getByTestId('resetTitle');
    expect(title.innerHTML).toBe('Reset');
  });

  it('have reset button', () => {
    const button = screen.getByTestId('resetButton');
    expect(button.childNodes[0].textContent).toBe('reset all');
  })

  it('have reset warning', () => {
    const text = screen.getByTestId('resetWarning');
    expect(text).toBeInTheDocument;
  })
})