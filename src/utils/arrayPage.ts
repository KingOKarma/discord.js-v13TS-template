/**
 * Used to create pages from an array
 * @param {Array} array The array to page
 * @param {number} pageSize How big are each of the pages?
 * @param {number} pageNumber Which Page number do you wish to be on?
 * @returns {Array} an array
 */
export function arrayPage<T>(array: T[], pageSize: number, pageNumber: number): T[] {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
}