import React from 'react';
import { render } from '@testing-library/react';
import MainPage from "./MainPage";

test('renders "Start your work" Button', () => {
    const { getByText } = render(<MainPage/>);
    const linkElement = getByText(/Start your work/i);
    expect(linkElement).toBeInTheDocument();
});
