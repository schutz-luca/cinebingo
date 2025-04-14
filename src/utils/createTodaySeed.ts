import { getLocalDate } from './getLocalDate';

export const createTodaySeed = () => {
    const todayLocal = getLocalDate();
    return parseInt(todayLocal.toISOString().split('T')[0].replace(/-/g, ''), 10) + 1;
};
