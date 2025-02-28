import { useContext } from 'react';
import { GameContext } from '../../context/game-context';

export const GameOverReport = () => {
    const { gameOverReport } = useContext(GameContext);

    if (!gameOverReport.value) return;

    return (
        <div className='over-report'>
            <h2>{gameOverReport.value.win ? 'You Won! 🎉' : 'Game Over... 👾'}</h2>
            <br />
            <small>{gameOverReport.value.optionsUsed} opções gastas</small>
        </div>
    );
};
