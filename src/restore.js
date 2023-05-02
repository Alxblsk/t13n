export function restoreCase(letter = '', props = {}) {
    if (props.isUpperCase === true) {
        return letter.toUpperCase()
    }
    return letter;
}