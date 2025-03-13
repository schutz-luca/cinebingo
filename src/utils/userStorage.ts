export const userStorage = {
    get: () => {
        const value = localStorage.getItem('persist:user');
        if (!value) return undefined;
        return JSON.parse(value);
    },
    set: (value: any) => {
        localStorage.setItem('persist:user', JSON.stringify(value));
    },
};
