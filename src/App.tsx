import { useContext } from 'react';
import './App.scss';
import { TargetMovie } from './components/current-movie';
import { Board } from './components/board';
import { GameOverReport } from './components/game-over-report';
import { GameContext } from './context/game-context';

function App() {
    const { gameOverReport } = useContext(GameContext);
    return (
        <div className='container'>
            <h1>
                cine<span className='cursive'>bingo</span>
            </h1>
            {!gameOverReport.value ? <TargetMovie /> : <GameOverReport />}

            <Board />
        </div>
    );
}

export default App;
