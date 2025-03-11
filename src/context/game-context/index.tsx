import { createContext, useEffect, useState } from 'react';
import { GameContextData } from './types';
import { Parent } from '../../@types/commons';
import { BoardItem } from '../../components/board/types';
import { isEqual } from 'lodash';
import { Content, ContentView } from '../../@types/content.type';
import { ContentService } from '../../api';
import { getRandomItems } from '../../utils/getRandomItens';

export const GameContext = createContext({} as GameContextData);

export const GameProvider = (props: Parent) => {
    const [skipableContent, setSkipableContent] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [board, setBoard] = useState<BoardItem[]>();
    const [gameOverReport, setGameOverReport] = useState<{ optionsUsed: number; win: boolean; points: number }>();
    const [points, setPoints] = useState(0);

    const currentContent = skipableContent[currentIndex];

    const skip = () => setCurrentIndex(currentIndex + 1);

    const selectCategoryFromContent = (content: ContentView, selectedCategories: BoardItem[]) => {
        // Remove name from board view categories
        let keys = Object.keys(content).filter((key) => key !== 'name') as (keyof ContentView)[];

        // Check and remove if there's empty awards
        if (!content.awards?.length) keys = keys.filter((key) => key !== 'awards');

        // Filter keys which has already its value on selectedCategories array
        keys = keys.filter(
            (key) =>
                !selectedCategories.some((item) =>
                    Array.isArray(content[key]) ? content[key].includes(item.value) : item.value === content[key],
                ),
        );

        // Select a random category
        const selectedKey = getRandomItems(keys, 1)[0];

        // Find the corresponding category value
        const value = content[selectedKey];

        // If the option is an array, select a random value
        const selectedValue = Array.isArray(value) ? getRandomItems(value, 1)[0] : value;

        let selectedCategory = {
            category: selectedKey,
            value: selectedValue,
            checked: '',
        } as BoardItem;

        selectedCategories.push(selectedCategory);
    };

    const generateBoard = (content: ContentView[]) => {
        const selectedContents = getRandomItems<ContentView>(content, 9);

        const selectedCategories: BoardItem[] = [];

        selectedContents.map((content) => selectCategoryFromContent(content, selectedCategories));

        return selectedCategories;
    };

    useEffect(() => {
        // Fetch content
        const allContent = ContentService.getContent();

        // Generate board
        const board = generateBoard(allContent);

        // Select skipable options
        const selectedContent = getRandomItems<Content>(allContent, allContent.length);

        setSkipableContent(selectedContent);
        setBoard(board);
    }, []);

    // Rounds control
    useEffect(() => {
        if (!board) return;

        // Update points
        const points = board.filter((item) => item.checked === 'correct').length * 200;
        setPoints(points);

        // Set lose if the current position equals skipable content count
        if (currentIndex >= skipableContent.length) {
            // Set win only if every clicked option was correct
            const win = board.every((item) => item.checked === 'correct');
            setGameOverReport({
                win,
                points,
                optionsUsed: currentIndex,
            });
        }
    }, [currentIndex]);

    const gameContextData: GameContextData = {
        skipableContent: { value: skipableContent, set: setSkipableContent },
        board: { value: board, set: setBoard },
        gameOverReport: { value: gameOverReport, set: setGameOverReport },
        points: { value: points, set: setPoints },
        currentIndex: { value: currentIndex, set: setCurrentIndex },
        skip,
        currentContent,
    };

    return <GameContext.Provider value={gameContextData}>{props.children}</GameContext.Provider>;
};
