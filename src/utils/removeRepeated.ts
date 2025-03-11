/**
 * @param array
 * @returns array without repeated options
 */
export const removeRepeated = <T>(arr: T[]) => [...new Set(arr)];
