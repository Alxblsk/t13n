import { DEFAULT_FALLBACK } from "./defaults.js";

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
        const settings = dictionary[symbol];
        const { upper, symbolicLink, ignore, unsafe, fallback, ...restSettings}  = settings;

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