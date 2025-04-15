import { Player } from '../lib/fluid-framework/types';

export const sortRanking = (players: Player[]) =>
    players.sort((a, b) => {
        if (b.points !== a.points || (!a.tries || !b?.tries)) {
            return b.points - a.points; // Sort by 'points' in DESC order
        }
        return a.tries - b.tries; // If 'points' is the same, sort by 'tries' in ASC order
    });
