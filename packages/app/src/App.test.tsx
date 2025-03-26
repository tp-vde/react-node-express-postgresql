import React from 'react';
import { render, waitFor } from '@testing-library/react';
import App from './App';
import '@types/jest';


describe('App', () => {
  it('should render', async () => {
    
    const { getByText } = render(<App />);

    await waitFor(() => {
      expect(getByText(/learn react/i)).toBeDefined();
    });
  });
});
