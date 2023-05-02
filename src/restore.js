export function restoreCase(letter, props = {}) {
    if (letter && props.isUpperCase === true) {
        const [first, ...rest] = letter.split('');
        
        return [first.toUpperCase(), ...rest].join('');
    }

    return letter;
}