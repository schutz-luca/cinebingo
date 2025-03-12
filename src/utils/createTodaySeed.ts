export const createTodaySeed = () => {
    const localDate = new Date();
    const offset = localDate.getTimezoneOffset() * 60000; // Convert offset to milliseconds
    const todayLocal = new Date(localDate.getTime() - offset);
    return parseInt(todayLocal.toISOString().split('T')[0].replace(/-/g, ''), 10);
}
