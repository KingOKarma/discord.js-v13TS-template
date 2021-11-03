/**
 * Used to format strings
 * @param {string} message string to convert
 * @param {string} find regex value to look for
 * @param {string} replace what to replace regex with
* @returns string
 */
export function formatString(message: string, find: string, replace: string ): string {
    let formatedText = message;

    if (message.includes(find)) {
        const reg = new RegExp(find);
        formatedText = formatedText.replace(reg, replace);
    }

    return formatedText;

}