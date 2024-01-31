import React, {useEffect, useState} from 'react'
import StatTile from '../components/StatTile'

import { CookieManager } from '../services/CookieManager';
import { isWithin24Hours, formatElapsedTime } from '../services/DateFormating';

type EndGameModalProps = {
  setPage: (page: string) => void,
  bestStats: {bestTime: number, dailyStreak: number, bestArticle: string, lastPlayed: Date}
  currentStats: {articleName: string, time: number}
}
function EndGameModal(props: EndGameModalProps) {
  const { setPage, bestStats, currentStats } = props;
  const [elapsedTime, setElapsedTime] = useState(0);
  
  const [bestTime, setBestTime] = useState(bestStats.bestTime);
  const [dailyStreak, setDailyStreak] = useState(bestStats.dailyStreak);


  useEffect(() => {
    const cookieManager = new CookieManager();
    const elapsedTimeLocal = new Date().getTime()-currentStats.time;
    setElapsedTime(elapsedTimeLocal);
    
    console.log(elapsedTimeLocal);
    console.log(bestStats.bestTime);
    if (elapsedTimeLocal < bestStats.bestTime || bestStats.bestTime === 0) {
      cookieManager.setCookie('bestTime', elapsedTimeLocal.toString());
      cookieManager.setCookie('bestArticle', currentStats.articleName);
      setBestTime(elapsedTimeLocal);
    }

    if (isWithin24Hours(new Date(), new Date(bestStats.lastPlayed)) || bestStats.dailyStreak === 0) {
      cookieManager.setCookie('dailyStreak', (dailyStreak + 1).toString());
      cookieManager.setCookie('lastPlayed', new Date().toJSON());
      setDailyStreak((val) => val + 1);
    
    }

    cookieManager.setCookie('lastPlayed', new Date().toJSON());
  }, []);

  return (
    <div className='modal-wrapper' aria-label={'wining pop up window'}>
      <div className='modal-container'>
        <div className='modal-header'><h1>you did it! congratulations!</h1></div>
        <div className='modal-body' aria-label={'stats tiles'}>
            <StatTile icon='⏰' value={formatElapsedTime(elapsedTime)} label='your time' />
            <StatTile icon='👑' value={formatElapsedTime(bestTime)} label='your best time' />
            <StatTile icon='🔥' value={dailyStreak.toString()} label='your streak' />
        </div>
        <div className='modal-footer'>
          <button id='try-again' onClick={() => {setPage('Home')}} aria-label={'go back to the home screen button'}>Restart Game</button>
        </div>
      </div>
    </div>
  )
}

export default EndGameModal