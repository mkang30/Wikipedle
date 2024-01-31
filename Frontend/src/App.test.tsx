import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import App from './App';

let startButton: HTMLButtonElement;
beforeEach(async () => {
  await act(async () => {render(<App />)});
  startButton = screen.getByRole("button", {name: "start game button"})
});

// Test page loading
test('test game page load', async () => {
  await userEvent.click(startButton);
  
  const guessBox = screen.getByRole("textbox", {name: "text box to guess title in"})
  expect(guessBox).toBeInTheDocument(); 
});

test('test game end', async () => {
  await userEvent.click(startButton);
  
  const guessBox = screen.getByRole("textbox", {name: "text box to guess title in"})
  await userEvent.type(guessBox, "###MOCKED###");
  await userEvent.type(guessBox, '{enter}')


  await new Promise((r) => setTimeout(r, 1000));

  const restartButton = screen.getByRole("button", {name: "go back to the home screen button"})
  expect(restartButton).toBeInTheDocument(); 

});

test('test game restart', async () => {
  await userEvent.click(startButton);
  
  const guessBox = screen.getByRole("textbox", {name: "text box to guess title in"})
  await userEvent.type(guessBox, "###MOCKED###");
  await userEvent.type(guessBox, '{enter}')


  await new Promise((r) => setTimeout(r, 1000));

  const restartButton = screen.getByRole("button", {name: "go back to the home screen button"})
  await userEvent.click(restartButton);
});

test('test game time stat 1', async () => {
  await userEvent.click(startButton);
  
  await new Promise((r) => setTimeout(r, 2000));

  const guessBox = screen.getByRole("textbox", {name: "text box to guess title in"})
  await userEvent.type(guessBox, "###MOCKED###");
  await userEvent.type(guessBox, '{enter}')

  await new Promise((r) => setTimeout(r, 1000));

  expect(screen.getByLabelText('your time: 0m 2s')).toBeInTheDocument()

});

test('test game time stat 2', async () => {
  await userEvent.click(startButton);
  
  await new Promise((r) => setTimeout(r, 1000));

  const guessBox = screen.getByRole("textbox", {name: "text box to guess title in"})
  await userEvent.type(guessBox, "###MOCKED###");
  await userEvent.type(guessBox, '{enter}')

  await new Promise((r) => setTimeout(r, 1000));

  expect(screen.getByLabelText('your time: 0m 1s')).toBeInTheDocument()

});