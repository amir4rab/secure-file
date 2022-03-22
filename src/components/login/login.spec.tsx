/** @type {import('@types/jest')} */
import { render, screen } from '@testing-library/react';

import Login from './login';

describe('Login component tests', () => {
  beforeEach(() => {
    render(<Login />);
  });

  it('have title text' , () => {
    const title = screen.getByTestId('loginTitle');
    expect(title).toBeInTheDocument;
  });

  it('have login button', () => {
    const button = screen.getByTestId('loginButton');
    expect(button).toBeInTheDocument;
  })

  it('have reset link', () => {
    const link = screen.getByTestId('resetLink');
    expect(link).toBeInTheDocument;
  })
})