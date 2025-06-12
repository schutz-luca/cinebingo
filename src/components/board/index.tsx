import { useContext } from 'react';
import { categoryLabels } from '../../utils/translate';
import { GameContext } from '../../context/game-context';
import { BoardItem } from './types';
import './styles.scss';

export const Board = () => {
    const { board, currentContent, skip, points, skipableContent, gameOverReport } = useContext(GameContext);

    const clickContent = (boardItem: BoardItem, index: number) => {
        if (!board.value) return;

        // Check if the answear was correct
        const correct =
            currentContent[boardItem.category] == boardItem.value ||
            currentContent[boardItem.category].includes(boardItem.value);

        if (correct)
            board.set(
                board.value.map((item, currentIndex) => {
                    if (currentIndex === index) return { ...item, checked: 'correct' };
                    else return item;
                }),
            );
        else skipableContent.value.pop();

        // Pass the current content
        skip();
    };

    return (
        <>
            {!board.value ? (
                <div>'Board loading...' </div>
            ) : (
                <>
                    {gameOverReport.value && <h3>{points.value} pontos</h3>}
                    <div className='board'>
                        {board.value.map((item, index) => (
                            <button
                                className={`board-item${item.checked === 'correct' ? ' correct' : ''} ${item.category}`}
                                onClick={() => clickContent(item, index)}
                                disabled={item.checked === 'correct' || !!gameOverReport.value}
                                key={`${item.value}/${index}`}
                            >
                                <h4>{categoryLabels.pt[item.category]}</h4>
                                <p>{item.value}</p>
                            </button>
                        ))}
                    </div>
                </>
            )}
        </>
    );
};
