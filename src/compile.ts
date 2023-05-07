import { DEFAULT_FALLBACK, DEFAULT_RANGE_SEPARATOR } from "./defaults";
import { Dictionary, Ruleset } from "./types";

function getValue(symbol: string, ruleset: Ruleset, forceSafeValue: boolean) {
  const { ignore, unsafe, fallback, defaultValue = "" } = ruleset[symbol];

  if (unsafe && forceSafeValue) {
    return fallback || DEFAULT_FALLBACK;
  }

  if (ignore) {
    return symbol;
  }

  return defaultValue;
}

export function compileDictionary(ruleset: Ruleset, forceSafeValue: boolean = false) {
  if (!ruleset) {
    console.warn("No library object passed");
    return {};
  }

  let dictionary: Dictionary = {};

  dictionary = Object.keys(ruleset).reduce(function (acc, symbol) {
    if (!ruleset[symbol]) {
      return acc;
    }

    const { upper, symbolicLink, ignore, unsafe, fallback, ...restSettings } = ruleset[symbol];

    if (restSettings.type === "R") {
      const [from, to] = symbol.split(DEFAULT_RANGE_SEPARATOR);

      if (!!from && !!to) {
        const charFrom = from.codePointAt(0) || Number.MAX_SAFE_INTEGER;
        const charTo = to.codePointAt(0) || -1;

        for (let rangeChar = charFrom; rangeChar <= charTo; rangeChar++) {
          const rangeSymbol = String.fromCodePoint(rangeChar);
          acc[rangeSymbol] = { defaultValue: rangeSymbol };
        }
      }

      return acc;
    }

    if (ignore) {
      acc[symbol] = { defaultValue: getValue(symbol, ruleset, forceSafeValue) };
      return acc;
    }

    if (symbolicLink && ruleset[symbolicLink]) {
      acc[symbol] = { defaultValue: "", ...ruleset[symbolicLink] };
      return acc;
    }

    if (upper) {
      acc[upper] = {
        isUpperCase: true,
        defaultValue: getValue(symbol, ruleset, forceSafeValue),
      };
    }

    acc[symbol] = {
      ...restSettings,
      isUpperCase: false,
      defaultValue: getValue(symbol, ruleset, forceSafeValue),
    };
    return acc;
  }, dictionary);

  return dictionary;
}
