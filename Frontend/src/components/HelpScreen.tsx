import React from 'react'
import {BabyChangingStation} from "@mui/icons-material";

type HelpScreenProps = {
    setHelp : (b:boolean) => void
}

export function HelpScreen(props:HelpScreenProps){
    return (<div className='modal-wrapper'>
            <div className={'help-screen-wrapper'}>
                <h2>Wikipedle</h2>
                        <p>Try to guess the title given the text in the article!
                        More and more text will become clear as you guess.
                        The higher the similarity number, the closer you are!</p>
                <button aria-label = {'press to go back to game'} onClick={() => props.setHelp(false)}>Go Back</button></div>

        </div>

    )
}