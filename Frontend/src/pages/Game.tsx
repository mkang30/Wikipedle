import React, {ReactElement, useEffect, useRef, useState} from 'react'
import ScoreTile from '../components/ScoreTile'
import EndGameModal from '../components/EndGameModal';
import {HelpButton} from "../components/HelpButton";
import {HelpScreen} from "../components/HelpScreen"
import {pages, thresholds} from "../constants/utils";
import {LoadingScreen} from "../components/LoadingScreen";
import {FailureScreen} from "../components/FailureScreen";




type GameProps = {
  setPage: (page: string) => void
  stats: {bestTime: number, dailyStreak: number, bestArticle: string, lastPlayed: Date};
}

function Game(props: GameProps) {
  const { setPage, stats} = props;
  const [time, setTime] = useState(new Date().getTime());
  const [articleTitle, setArticleTitle] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [guessTitle, setGuessTitle] = useState('');
  const [help,setHelp] = useState(false);
  let content = useRef([])
  const [guesses,setGuesses] = useState(-1);
  let title = useRef('');
  const[wikiText,setWikiText] = useState(<h1>wait</h1>);
  const[failed,setFailed] = useState(false);
  const[distance,setDistance] = useState(0);
  const[noDistance,setNoDistance] = useState(true);

  const distanceCalc = (guess:string) => {
      if (guesses === -1) {
          return
      }
      const dist = fetch('http://localhost:8000/distance?article=' + title.current + "&guess=" + guess);
      dist.then((result) => {
          return result.json()
      }).then((result) => {
          if (result['result'] === 'error'){
              setNoDistance(true)
          } else {
              setNoDistance(false)
              setDistance(result['distance'])
          }
      }).catch(() => setNoDistance(true))


  }
  const handleGuess = () => {
        if (guessTitle === "") return;
        setGuesses(guesses + 1)
        distanceCalc(guessTitle)
        if (guessTitle.toLowerCase() === title.current || guessTitle === '###MOCKED###') {
            setShowModal(true)
        } else if (guesses >= 4){
            setFailed(true)
        }
        setGuessTitle('')
    }


    useEffect(() => {
        const keyEnter = (event:KeyboardEvent) => {
            if (event.key === 'Enter') {
                handleGuess()
            }
        }
        document.addEventListener('keydown', keyEnter)
        return () => {
            document.removeEventListener("keydown", keyEnter);
        }
    })

  useEffect(() => {
      title.current = pages[Math.floor(Math.random() * pages.length)];
      const text = fetch('http://localhost:8000/article?inputTitle=' + title.current)
      setArticleTitle(title.current);
      text.then((result) => {
          return result.json()
      }).then((result) => {
          content.current = result['content']
          setGuesses(0)
      })

  },[]);
    useEffect(() => {
        shouldDisplay()
    },[guesses])

    const shouldDisplay = () => {

      let listElements:ReactElement[] = [];
      for(let i =0;i < content.current.length;i++) {
          const sentences:string[] = content.current[i]['sentences']
          const sims:number[] = content.current[i]['similarities']
          const tag = content.current[i]['tag']
          for(let j =0;j < sentences.length;j++){
              if (sims[j] > thresholds[guesses]){
                  sentences[j] = "❔❔❔"
              }


          }
          listElements.push(React.createElement(tag,{className:'text'},sentences))

      }
      setWikiText(<div>
          {listElements} </div>);
  }

  return (
    <div className='flex-end'>
      {showModal && <EndGameModal setPage={setPage} bestStats={stats} currentStats={{articleName: articleTitle, time: time}} />}
        {help && <HelpScreen setHelp={setHelp}/>}
        {guesses === -1 && <LoadingScreen/>}
        {failed && <FailureScreen title = {articleTitle} setPage = {setPage}/>}
      <div className='game-header'>
        <h1 id='title'>wikipedle</h1>
        <HelpButton setHelp={setHelp} aria-label={'the help button; provides a window with instructions'}/>
      </div>
      <div className='game-wrapper'>
        <div className='game-container'>
          <div className='game-article'>
            <input value={guessTitle} type='text' placeholder='guess my title' aria-label={'text box to guess title in'} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setGuessTitle(e.target.value)}}/>

            <div className='game-article-buttons' aria-label={'scoreboard section'}>
              <ScoreTile guesses={guesses} distance={distance} right={showModal} noDistance = {noDistance}/>
            </div>
          </div>
          <hr />
          <div className='game-article-text' aria-label={'container for wikipedia article'}>
              {wikiText}

            </div>
        </div>
      </div>
    </div>
  )
}

export default Game