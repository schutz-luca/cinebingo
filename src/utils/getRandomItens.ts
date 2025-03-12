import { createTodaySeed } from './createTodaySeed';

export const getRandomItems = <T>(arr: T[], count: number, seed?: number): T[] => {
    if (!seed) seed = createTodaySeed();

    if (arr.length === 0 || count <= 0) return [];

    // Function to generate a pseudo-random number based on the seed (if provided)
    const randomFn =
        seed !== undefined
            ? (n: number) => {
                  let x = Math.sin(seed + n) * 10000;
                  return x - Math.floor(x);
              }
            : () => Math.random(); // Uses Math.random() if no seed is provided

    // Shuffle items using the seed-based or random function
    const shuffledArray = arr
        .map((item, index) => ({ item, rand: randomFn(index) }))
        .sort((a, b) => a.rand - b.rand)
        .map((entry) => entry.item);

    // Return the first 'count' items
    return shuffledArray.slice(0, count);
};
