import { createContext, useEffect, useState } from 'react';
import { GameContextData } from './types';
import { Parent } from '../../@types/commons';
import { BoardItem } from '../../components/board/types';
import { Content, ContentView } from '../../@types/content.type';
import { ContentService } from '../../api';
import { getRandomItems } from '../../utils/getRandomItens';
import { createTodaySeed } from '../../utils/createTodaySeed';
import { filterToContentView } from '../../utils/filterToBoardContent';

export const GameContext = createContext({} as GameContextData);

export const GameProvider = (props: Parent) => {
    const [skipableContent, setSkipableContent] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [board, setBoard] = useState<BoardItem[]>();
    const [gameOverReport, setGameOverReport] = useState<{ optionsUsed: number; win: boolean; points: number }>();
    const [points, setPoints] = useState(0);

    const currentContent = skipableContent[currentIndex] as Content;

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

        // Enhance randomness preventing multiple repeated categories in the board
        const categoriesCount: any = {};
        const excludeList: (keyof ContentView)[] = [];
        selectedCategories.forEach((item) => {
            categoriesCount[item.category] = (categoriesCount?.[item.category] || 0) + 1;
            if (categoriesCount[item.category] >= 2) excludeList.push(item.category);
        });

        // Select a random category
        const selectedKey = getRandomItems(keys, 1, undefined, excludeList)[0];

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

    const generateBoard = (allContents: ContentView[]) => {
        const selectedContents = filterToContentView(getRandomItems<ContentView>(allContents, 9));

        let selectedCategories: BoardItem[] = [];

        // Shuffle board items
        getRandomItems(selectedContents, selectedContents.length).map((content) =>
            selectCategoryFromContent(content, selectedCategories),
        );

        // Prevent equal categories of being in sequence
        selectedCategories = getRandomItems(selectedCategories, selectedCategories.length);

        return selectedCategories;
    };

    useEffect(() => {
        // Fetch content
        const allContent = ContentService.getContent();

        // Generate board
        const board = generateBoard(allContent);

        // Prevent from using exactly the same seed to `selectedContent`, preventing it from being on the same order of the board options
        const seed = (createTodaySeed() / 2) * 3;

        // Select skipable options
        const selectedContent = getRandomItems<Content>(allContent, allContent.length, seed);

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

        if (board.filter((item) => item.checked === 'correct').length === board.length)
            setGameOverReport({
                win: true,
                points,
                optionsUsed: currentIndex,
            });
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
