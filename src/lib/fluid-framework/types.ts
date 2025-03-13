export interface Player {
    id: string;
    name: string;
    points: number;
    tries: number;
}

export interface Ranking {
    dateCode: number;
    players: Player[];
}
