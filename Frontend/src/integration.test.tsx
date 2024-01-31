import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import {Simulate} from "react-dom/test-utils";
import App from "./App";
import Game from "./pages/Game";


test('loading screen appears', async () => {
    render(<App/>)
    const button = screen.getByLabelText('start game button')
    expect(button).toBeInTheDocument()
    fireEvent.click(button)
    expect(screen.getByText('Please wait for the article to load')).toBeInTheDocument()
})

test('all stat tiles appear', async () => {
    render(<App/>)
    expect(screen.getByText('wikipedle')).toBeInTheDocument()
    expect(screen.getByLabelText('your best time: 0m 0s')).toBeInTheDocument()
    expect(screen.getByLabelText('your best article: ...')).toBeInTheDocument()
})


