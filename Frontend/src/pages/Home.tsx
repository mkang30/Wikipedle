import React from 'react'
import StatTile from '../components/StatTile'

import { formatElapsedTime } from '../services/DateFormating'

type HomeProps = {
    setPage: (page: string) => void
    stats: {bestTime: number, dailyStreak: number, bestArticle: string}
}

function Home(props: HomeProps) {
  const { setPage, stats } = props;
  console.log(stats)
  return (
    <div className='home-wrapper'>
        <div className='home-container'>
            <h1 id='title'>wikipedle</h1>
            <p id='subtitle'>the game for wikipedia experts</p>

            <div className='stat-tiles'>
                <StatTile icon='👑' value={formatElapsedTime(stats.bestTime)} label='your best time' aria-label={'stat tile for best time'} />
                <StatTile icon='📑' value={stats.bestArticle} label='your best article' aria-label={'stat tile for best article'} />
                <StatTile icon='🔥' value={stats.dailyStreak.toString()} label='your daily streak' aria-label={'stat tile for daily streak'} />
            </div>

            <div className='home-buttons'>
                <button id='start-button' onClick={() => {setPage('Game')}} aria-label='start game button'>Start Game</button>
            </div>
        </div>
    </div>
  )
}

export default Home