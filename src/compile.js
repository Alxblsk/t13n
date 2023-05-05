import { DEFAULT_FALLBACK, DEFAULT_RANGE_SEPARATOR } from "./defaults.js";

function getValue(symbol, dictionary, forceSafeValue) {
    const { ignore, unsafe, fallback, defaultValue }  = dictionary[symbol];

    if (unsafe && forceSafeValue) {
        return fallback || DEFAULT_FALLBACK;
    }

    if (ignore) {
        return symbol;
    }

    return defaultValue;
}

export function compileDictionary(dictionary, forceSafeValue) {
    if (!dictionary) {
        console.warn('No library object passed');
        return {};
    }

    const result = Object.keys(dictionary).reduce(function(acc, symbol) {
        if (!dictionary[symbol]) {
            return acc;
        }

        const { upper, symbolicLink, ignore, unsafe, fallback, ...restSettings} = dictionary[symbol];

        if (restSettings.type === 'R') {
            const [from, to] = symbol.split(DEFAULT_RANGE_SEPARATOR);

            if (!!from && !!to) {
                const charFrom = from.codePointAt();
                const charTo = to.codePointAt();

                for (let rangeChar = charFrom; rangeChar <= charTo; rangeChar++) {
                    const rangeSymbol = String.fromCodePoint(rangeChar);
                    acc[rangeSymbol] = { defaultValue: rangeSymbol };
                }
            }

            return acc;
        }

        if (ignore) {
            acc[symbol] = { ...restSettings, defaultValue: getValue(symbol, dictionary, forceSafeValue) };
            return acc;
        } 
        
        if (symbolicLink && dictionary[symbolicLink]) {
            acc[symbol] = dictionary[symbolicLink];
            return acc;
        } 
        
        if (upper) {
            acc[upper] = { ...restSettings, isUpperCase: true };
        } 

        acc[symbol] = { ...restSettings, isUpperCase: false, defaultValue: getValue(symbol, dictionary, forceSafeValue) };
        return acc;
    }, {});

    return result;
}