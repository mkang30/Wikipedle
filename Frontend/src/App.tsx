import React, {useState, useEffect} from 'react';

import Home from './pages/Home';
import Game from './pages/Game';

import { CookieManager } from './services/CookieManager';

import './App.css';

function App() {
  const [page, setPage] = useState('Home');
  const [cookieManager, setCookieManager] = useState(new CookieManager());
  const [stats, setStats] = useState({bestTime: 0, dailyStreak: 0, bestArticle: '...', lastPlayed: new Date()});

  useEffect(() => {
    const bestTime = cookieManager.getCookie('bestTime');
    console.log(bestTime);
    if (bestTime) {
      setStats(stats => ({...stats, bestTime: parseInt(bestTime)}));
    }

    const dailyStreak = cookieManager.getCookie('dailyStreak');
    if (dailyStreak) {
      setStats(stats => ({...stats, dailyStreak: parseInt(dailyStreak)}));
    }

    const bestArticle = cookieManager.getCookie('bestArticle');
    if (bestArticle) {
      setStats(stats => ({...stats, bestArticle: bestArticle}));
    }

    const lastPlayed = cookieManager.getCookie('lastPlayed');
    if (lastPlayed) {
      setStats(stats => ({...stats, lastPlayed: new Date(lastPlayed)}));
    }
  }, [page]);

  return (
    <div className="App">
      {page === 'Home' && (<Home setPage={setPage} stats={stats} />)}
      {page === 'Game' && (<Game setPage={setPage} stats={stats} />)}
    </div>
  );
}

export default App;
