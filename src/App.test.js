import React from 'react';
import {render} from '@testing-library/react';
import App from './App';

test('renders "Start your work" Button', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Start your work/i);
  expect(linkElement).toBeInTheDocument();
});
