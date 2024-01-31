import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import App from './App';
import StatTile from "./components/StatTile";
import {FailureScreen} from "./components/FailureScreen";
import {HelpButton} from "./components/HelpButton";
import {HelpScreen} from "./components/HelpScreen";
import {LoadingScreen} from "./components/LoadingScreen";
import ScoreTile from "./components/ScoreTile";



test("stat tile works", () => {
  render(<StatTile icon={'crown'} value={'hi'} label={'smiley'}/>)
  expect(screen.getByText('hi')).toBeInTheDocument()
  expect(screen.getByText('smiley')).toBeInTheDocument()
})

test('FailureScreen works',() => {
  const setPage = ()  => {}
  render(<FailureScreen setPage={setPage} title={'llama'}/>)
  expect(screen.getByLabelText('failure screen text')).toBeInTheDocument()
  expect(screen.getByText('Oh no! The title was llama')).toBeInTheDocument()
})

test('help button is clickable', () => {
  let bool = false;
  const setBool = () => {bool = true}
  render(<HelpButton setHelp={setBool}/>)
  const icon = screen.getByLabelText('help icon')
  fireEvent.click(icon)
  expect(bool).toBe(true)
})

test('help screen is correct', () => {
    let bool = true;
    const setBool = () => {bool = false}
    render(<HelpScreen setHelp={setBool}/>)
    expect(screen.getByText('Try to guess the title given the text in the article! ' +
        'More and more text will become clear as you guess. ' +
        'The higher the similarity number, the closer you are!')).toBeInTheDocument()
    expect(screen.getByText('Wikipedle')).toBeInTheDocument()
    const button = screen.getByLabelText('press to go back to game')
    fireEvent.click(button)
    expect(bool).toBe(false)

})

test('loading screen is correct',() => {
    render(<LoadingScreen/>)
    expect(screen.getByLabelText('Loading Icon')).toBeInTheDocument()
    expect(screen.getByLabelText('Loading Screen')).toBeInTheDocument()
    expect(screen.getByText('Please wait for the article to load')).toBeInTheDocument()
})

test('score tile is working correctly', () => {
    render(<ScoreTile distance={2} guesses={3} noDistance={false} right={false}/>)
    expect(screen.getAllByLabelText('wrong').length).toBe(3)
    //expect(screen.getAllByLabelText('right').length).toBe(0)
    expect(screen.getByText('guess similarity is')).toBeInTheDocument()
    render(<ScoreTile distance = {0} guesses={2} noDistance={true} right={true}/>)
    expect(screen.getAllByLabelText('wrong').length).toBe(4)
    //expect(screen.getByLabelText('right')).toBeInTheDocument()
    expect(screen.getByText('No similarity was found')).toBeInTheDocument()
})
