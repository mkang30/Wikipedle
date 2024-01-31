import React, {ReactElement, useEffect, useState} from 'react'

type ScoreTileProps = {
    distance:number,
    guesses:number,
    right:boolean,
    noDistance:boolean
}
function ScoreTile(props:ScoreTileProps) {
    const[guessNumber,setGuessNumber] = useState([<div className='score-tile-icon' aria-label={'empty'}></div>,<div className='score-tile-icon ' aria-label={'empty'}></div>,<div className='score-tile-icon ' aria-label={'empty'}></div>,<div className='score-tile-icon ' aria-label={'empty'}></div>,<div className='score-tile-icon ' aria-label={'empty'}></div>])
    useEffect(() => {
        const oldArr = [...guessNumber]
        for(let i = 0; i < 5;i ++ ){
            if ( i < props.guesses && !props.right){
                oldArr[i] = <div className='score-tile-icon wrong' aria-label={'wrong'}></div>
            }
            else if (!props.right){
                const oldArr = [...guessNumber]
                oldArr[i] = <div className='score-tile-icon' aria-label={'empty'}></div>
            }
        }
        if (props.right){
            for(let i = 0; i < 5;i ++){
                if (props.guesses - 1 === i){
                    console.log('right')
                    oldArr[i] = <div className='score-tile-icon correct' aria-label={'right'}></div>
                } else if (i < props.guesses - 1 ){
                    oldArr[i] = <div className='score-tile-icon wrong' aria-label={'wrong'}></div>
                } else {
                    oldArr[i] = <div className='score-tile-icon' aria-label={'empty'}></div>
                }
            }
        }
        setGuessNumber(oldArr)

    },[props.guesses])
  return (
    <div className='score-tile-wrapper'>
      <div className='score-tile-distance' aria-label={'guessing distance'}>
          {!props.noDistance?<p>guess similarity is <b>{props.distance}</b></p>:<p>No similarity was found</p>}
      </div>
      <div className='score-tile-icon-wrapper' aria-label={'guesses'}>
          {guessNumber}
      </div>
    </div>
  )
}

export default ScoreTile