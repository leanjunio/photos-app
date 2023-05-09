import React from 'react';
import { render, screen, waitForElementToBeRemoved, within } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

it('shows the initial state of the photo grid - Recently Added', async () => {
  render(<App />);
  await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
  expect(screen.getByText(/click on a photo/i)).toBeVisible();
});

it('removes the deleted photo from the page', async () => {
  render(<App />);
  const photo = /so_iceland_keira\.jpg/i;
  await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
  await userEvent.click(screen.getByText(photo));
  expect(within(screen.getByLabelText(/sidebar/i)).getByAltText(photo)).toBeVisible();
  await userEvent.click(screen.getByText(/delete/i));
  expect(screen.queryByText(photo)).not.toBeInTheDocument();
  expect(screen.getByText(/click on a photo/i)).toBeVisible();
});

it('shows a "Liked" photo on the "Favorited" tab', async () => {
  render(<App />);
  const photo = /so_iceland_keira\.jpg/i;
  await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
  await userEvent.click(within(screen.getByLabelText(/sidebar/i)).getByText(/like/i));
  await userEvent.click(screen.getByText(/favorited/i));
  expect(within(screen.getByLabelText(/photo grid/i)).getByText(photo)).toBeVisible();
});

it('removes a "Liked" photo on the "Favorited" tab', async () => {
  render(<App />);
  await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

  const photoGrid = screen.getByLabelText(/photo grid/i);

  // unlike a photo
  await userEvent.click(screen.getByText(/favorited/i));
  await userEvent.click(within(photoGrid).getByText(/female_cyan/i));
  await userEvent.click(within(screen.getByLabelText(/sidebar/i)).getByLabelText(/like button/i));
  expect(within(photoGrid).queryByText(/female_cyan/i)).not.toBeInTheDocument();
})
