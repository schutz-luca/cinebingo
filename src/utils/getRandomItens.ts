export const getRandomItems = <T>(arr: T[], count: number) => {
    // Create a new array to store the random items
    const randomItems = [];

    // Clone the array to avoid modifying the original
    const arrayCopy = [...arr];

    // While we need more items
    while (count > 0 && arrayCopy.length > 0) {
        // Generate a random index
        const randomIndex = Math.floor(Math.random() * arrayCopy.length);

        // Remove the item at the random index and add it to the result array
        randomItems.push(arrayCopy[randomIndex]);
        arrayCopy.splice(randomIndex, 1); // Remove the item to avoid duplicates

        count--; // Decrease the count of needed items
    }

    return randomItems;
}