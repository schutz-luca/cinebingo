import { FormEvent, useContext, useEffect, useState } from 'react';
import { useSharedRanking } from '../../lib/fluid-framework/useSharedRanking';
import { sortRanking } from '../../utils/sortRanking';
import { GameContext } from '../../context/game-context';
import { userStorage } from '../../utils/userStorage';

export const Ranking = () => {
    const { sharedRanking, joinPoints, joinUser } = useSharedRanking();
    const [userJoined, setUserJoined] = useState(!!userStorage.get());

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
        <div>
            {!userJoined && (
                <form onSubmit={joinRanking}>
                    <h4>Participe do ranking global</h4>
                    <input name='username' placeholder='username' />
                    <button>Entrar</button>
                </form>
            )}
            {sharedRanking && (
                <>
                    <h4>{sharedRanking?.dateCode} Ranking</h4>

                    <ol>
                        {players.map((player, index) => (
                            <li key={player.id + index}>
                                <b>{player.name}</b>: {player.points} pontos / {player.tries} tentativas
                            </li>
                        ))}
                    </ol>
                </>
            )}
        </div>
    );
};
