import { useContext } from 'react';
import './App.scss';
import { TargetMovie } from './components/current-movie';
import { Board } from './components/board';
import { GameOverReport } from './components/game-over-report';
import { GameContext } from './context/game-context';
import { Ranking } from './components/ranking';
import { Logo } from './components/logo';

function App() {
    const { gameOverReport, currentContent } = useContext(GameContext);

    // useEffect(() => {
    //     // (async () => {
    //     //     const allContent = ContentService.getContent();

    //     //     const movies = await getMoviePosters(allContent);
    //     //     console.log(movies);
    //     // })()
    // }, [])

    return (
        <div className='container'>
            <Ranking />
            <Logo />
            {!gameOverReport.value ? <TargetMovie /> : <GameOverReport />}

            <Board />
            <img className='cover' src={currentContent?.poster} />
        </div>
    );
}

export default App;
