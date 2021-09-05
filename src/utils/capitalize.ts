/**
   * Capitalise the first letter of a string
   * @param {string} s The string to capitalise
   * @returns {string} The capitalised string
   */
export function capitalize(s: string): string {
    return s[0].toUpperCase() + s.slice(1);
}