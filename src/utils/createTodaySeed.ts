export const createTodaySeed = () => parseInt(new Date().toISOString().split('T')[0].replace(/-/g, ''), 10);
