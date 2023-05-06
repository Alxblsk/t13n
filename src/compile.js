import { DEFAULT_FALLBACK, DEFAULT_RANGE_SEPARATOR } from "./defaults.js";

function getValue(symbol, ruleset, forceSafeValue) {
    const { ignore, unsafe, fallback, defaultValue }  = ruleset[symbol];

    if (unsafe && forceSafeValue) {
        return fallback || DEFAULT_FALLBACK;
    }

    if (ignore) {
        return symbol;
    }

    return defaultValue;
}

export function compileDictionary(ruleset, forceSafeValue) {
    if (!ruleset) {
        console.warn('No library object passed');
        return {};
    }

    return Object.keys(ruleset).reduce(function(acc, symbol) {
        if (!ruleset[symbol]) {
            return acc;
        }

        const { upper, symbolicLink, ignore, unsafe, fallback, ...restSettings} = ruleset[symbol];

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
            acc[symbol] = { ...restSettings, defaultValue: getValue(symbol, ruleset, forceSafeValue) };
            return acc;
        } 
        
        if (symbolicLink && ruleset[symbolicLink]) {
            acc[symbol] = ruleset[symbolicLink];
            return acc;
        } 
        
        if (upper) {
            acc[upper] = { ...restSettings, isUpperCase: true };
        } 

        acc[symbol] = { ...restSettings, isUpperCase: false, defaultValue: getValue(symbol, ruleset, forceSafeValue) };
        return acc;
    }, {});
}