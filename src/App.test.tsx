import React from 'react';
import { render, screen, waitForElementToBeRemoved, within } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

it('shows the initial state of the photo grid - Recently Added', async () => {
  render(<App />);
  await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
  expect(screen.getByText(/click on a photo/i)).toBeVisible();
});

it('shows the clicked photo on the sidebar', async () => {
  render(<App />);
  await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
  expect(screen.getByText(/click on a photo/i)).toBeVisible();
  expect(screen.getByText(/so_iceland_keira\.jpg/i)).toBeVisible();
  await userEvent.click(screen.getByText(/so_iceland_keira\.jpg/i));
  expect(within(screen.getByLabelText(/sidebar/i)).getByAltText(/so_iceland_keira\.jpg/i)).toBeVisible();
});
