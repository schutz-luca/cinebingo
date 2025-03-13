export const getLocalDate = () => {
    const localDate = new Date();
    const offset = localDate.getTimezoneOffset() * 60000; // Convert offset to milliseconds
    return new Date(localDate.getTime() - offset);
};
