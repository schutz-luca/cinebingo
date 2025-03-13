import { useCallback, useEffect, useState } from 'react';
import { isEqual } from 'lodash';
import { Player, Ranking } from './types';
import { useSharedMaps } from './useSharedMaps';
import { createTodaySeed } from '../../utils/createTodaySeed';
import { v6 as uuid } from 'uuid';
import { userStorage } from '../../utils/userStorage';

const key = '0';

export const useSharedRanking = () => {
    const { rankingMap } = useSharedMaps();

    const [sharedRanking, setSharedRanking] = useState<Ranking>();
    const [initialized, setInitialized] = useState(false);

    const joinUser = async (name: string) => {
        userStorage.set({
            id: uuid(),
            name,
        });
    };

    const dailyCheck = () => {
        if (!rankingMap) return;

        const todaySeed = createTodaySeed();
        const user = userStorage.get();

        if (!sharedRanking?.dateCode || todaySeed !== sharedRanking.dateCode)
            rankingMap.set(key, {
                dateCode: todaySeed,
                players: [],
            } as Ranking);

        if (user && user.done !== todaySeed) userStorage.set({ ...user, done: undefined });
    };

    const joinPoints = (points: number, tries: number) => {
        const user = userStorage.get();
        if (!rankingMap || !sharedRanking || !user) return;

        const player: Player = {
            id: user.id,
            name: user.name,
            points,
            tries,
        };

        rankingMap.set(key, {
            dateCode: sharedRanking.dateCode,
            players: [...sharedRanking.players, player],
        } as Ranking);

        userStorage.set({ ...user, done: sharedRanking.dateCode });
    };

    const refresh = useCallback(() => {
        if (!rankingMap) return;

        const value = rankingMap.get(key);

        if (value && !isEqual(value, sharedRanking)) setSharedRanking(value);
    }, [rankingMap, sharedRanking]);

    useEffect(() => {
        if (!initialized && rankingMap && !rankingMap.listenerCount('valueChanged')) {
            if (!initialized) setInitialized(true);
            rankingMap.on('valueChanged', refresh);
            refresh();
        }
    }, [rankingMap]);

    useEffect(() => {
        if (initialized) dailyCheck();
    }, [initialized]);

    useEffect(() => {
        console.log('[Ranking]', sharedRanking);
    }, [sharedRanking]);

    return { sharedRanking, joinUser, joinPoints };
};
