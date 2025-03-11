import { useContext } from 'react';
import { GameContext } from '../../context/game-context';
import { FaSkull } from 'react-icons/fa';

export const GameOverReport = () => {
    const { gameOverReport } = useContext(GameContext);

    if (!gameOverReport.value) return;

    return (
        <div className='over-report'>
            <h2>
                <FaSkull />
            </h2>
            <h2>{gameOverReport.value.win ? 'You Won! 🎉' : 'Game Over'} </h2>
            <small>{gameOverReport.value.optionsUsed} opções gastas</small>
        </div>
    );
};
