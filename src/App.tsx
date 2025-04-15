import { useContext } from 'react';
import './App.scss';
import { TargetMovie } from './components/current-movie';
import { Board } from './components/board';
import { GameOverReport } from './components/game-over-report';
import { GameContext } from './context/game-context';
import { RiMovie2AiLine } from 'react-icons/ri';
import { GiBrazilFlag } from 'react-icons/gi';
import { MdOutlineStarPurple500 } from 'react-icons/md';
import { Ranking } from './components/ranking';
import { getLocalDate } from './utils/getLocalDate';

function App() {
    const { gameOverReport } = useContext(GameContext);

    return (
        <div className='container'>
            <Ranking />
            <div className='logo'>
                <div className='center br'>
                    <MdOutlineStarPurple500 />
                    <GiBrazilFlag />
                    <MdOutlineStarPurple500 />
                </div>
                <h1 className='center'>
                    <RiMovie2AiLine />
                    cine<span className='cursive'>bingo</span>
                </h1>
                <small className='date'>{getLocalDate().toLocaleDateString().replace(/\//g, '.')}</small>
            </div>
            {!gameOverReport.value ? <TargetMovie /> : <GameOverReport />}

            <Board />
        </div>
    );
}

export default App;
