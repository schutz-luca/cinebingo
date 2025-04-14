import { FormEvent, useContext, useEffect, useState } from 'react';
import { useSharedRanking } from '../../lib/fluid-framework/useSharedRanking';
import { sortRanking } from '../../utils/sortRanking';
import { GameContext } from '../../context/game-context';
import { userStorage } from '../../utils/userStorage';
import './styles.scss';
import { FaRankingStar } from 'react-icons/fa6';
import { FaGlobe } from 'react-icons/fa';
import { LiaHandPointer } from 'react-icons/lia';

export const Ranking = () => {
    const { sharedRanking, joinPoints, joinUser } = useSharedRanking();
    const [userJoined, setUserJoined] = useState(!!userStorage.get());
    const [collapsed, setCollapsed] = useState(true);

    const { gameOverReport } = useContext(GameContext);

    const players = sharedRanking ? sortRanking(sharedRanking.players) : [];

    const joinRanking = async (e?: FormEvent<HTMLFormElement>) => {
        e?.preventDefault();

        const username = document.getElementsByTagName('input').namedItem('username')?.value;
        if (!username) {
            alert('Preencha o username para entrar no ranking');
            return;
        } else await joinUser(username);
        setUserJoined(true);
    };

    useEffect(() => {
        if (!gameOverReport.value || !userJoined) return;

        joinPoints(gameOverReport.value.points, gameOverReport.value.optionsUsed);
    }, [gameOverReport.value, userJoined]);

    return (
        <div className={`ranking-container${collapsed ? ' collapsed' : ''}`}>
            <div className='ranking-button' onClick={() => setCollapsed(!collapsed)}>
                <div className='icon'>
                    <FaRankingStar />
                </div>
                <p>{players?.length ? `1. ${players[0].name}` : 'Ranking'}</p>
                {collapsed && <LiaHandPointer className='click' />}
            </div>
            <div className='ranking'>
                {!userJoined && (
                    <form onSubmit={joinRanking}>
                        <h4>
                            participe do ranking global <FaGlobe />
                        </h4>
                        <div>
                            <input name='username' placeholder='username' maxLength={8} />
                            <button>entrar</button>
                        </div>
                    </form>
                )}
                {sharedRanking ? (
                    <>
                        {players.length === 0 ? (
                            <div className='empty-ranking'>Pontue e seja o primeiro do dia!</div>
                        ) : (
                            <ol>
                                {players.map((player, index) => (
                                    <li key={player.id + index}>
                                        <b>{player.name}</b>: {player.points} pontos / {player.tries} tentativas
                                    </li>
                                ))}
                            </ol>
                        )}
                    </>
                ) : (
                    <div className='empty-ranking'>Loading...</div>
                )}
            </div>
        </div>
    );
};
