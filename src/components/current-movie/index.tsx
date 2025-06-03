import { RiSkipForwardFill } from 'react-icons/ri';
import './styles.scss';
import { useContext } from 'react';
import { GameContext } from '../../context/game-context';

export const TargetMovie = () => {
    const { skip, currentContent, skipableContent, currentIndex } = useContext(GameContext);

    const lasts = skipableContent.value.length - currentIndex.value;

    return (
        <>
            <div className='current-content'>
                <div className='lasts'>{lasts}</div>
                <div className='details'>
                    <img src={currentContent?.poster} />
                    <h2>{currentContent?.name}</h2>
                </div>
                <div>
                    <button onClick={skip}>
                        <RiSkipForwardFill />
                    </button>
                </div>
            </div>
            <div className='content'></div>
        </>
    );
};
