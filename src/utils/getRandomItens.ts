import { createTodaySeed } from './createTodaySeed';

export const getRandomItems = <T>(arr: T[], count: number, seed?: number, exclude?: T[]): T[] => {
    if (!seed) seed = createTodaySeed();

    if (arr.length === 0 || count <= 0) return [];

    // Filter out excluded items (use deep equality if needed)
    const filteredArr = exclude ? arr.filter((item) => !exclude.includes(item)) : arr;

    if (filteredArr.length === 0) return [];

    // Function to generate a pseudo-random number based on the seed
    const randomFn = (n: number) => {
        let x = Math.sin(seed! + n) * 10000;
        return x - Math.floor(x);
    };

    // Shuffle using the seed-based or random function
    const shuffledArray = filteredArr
        .map((item, index) => ({ item, rand: randomFn(index) }))
        .sort((a, b) => a.rand - b.rand)
        .map((entry) => entry.item);

    return shuffledArray.slice(0, count);
};
