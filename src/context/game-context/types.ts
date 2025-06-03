import { BoardItem } from '../../components/board/types';
import { State } from '../../@types/commons';
import { Content } from '../../@types/content.type';

export interface GameOverReport {
    optionsUsed: number;
    win: boolean;
    points: number;
}

export interface GameContextData {
    skipableContent: State<any[]>;
    board: State<BoardItem[] | undefined>;
    gameOverReport: State<GameOverReport | undefined>;
    points: State<number>;
    currentIndex: State<number>;
    skip: () => void;
    currentContent: Content;
}
