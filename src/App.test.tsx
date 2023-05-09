import React from 'react';
import { render, screen, waitForElementToBeRemoved, within } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

it('shows the initial state of the photo grid - Recently Added', async () => {
  render(<App />);
  await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
  expect(screen.getByText(/click on a photo/i)).toBeVisible();
});

it('removes the deleted photo from the list of photos', async () => {
  render(<App />);
  const photo = /so_iceland_keira\.jpg/i;
  await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
  await userEvent.click(screen.getByText(photo));
  expect(within(screen.getByLabelText(/sidebar/i)).getByAltText(photo)).toBeVisible();
  await userEvent.click(screen.getByText(/delete/i));
  expect(screen.getByText(photo)).not.toBeVisible();
})
