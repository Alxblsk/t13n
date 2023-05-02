export function compileLib(lib) {
    if (!lib) {
        console.warn('No library object passed');
        return {};
    }

    return Object.keys(lib).reduce(function(acc, letter) {
        if (lib[letter]) {
            const { upper, ...restSettings}  = lib[letter];
        
            if (upper) {
                acc[upper] = { ...restSettings, isUpperCase: true };
            }

            acc[letter] = { ...restSettings, isUpperCase: false };
        }

        return acc;
    }, {});
}