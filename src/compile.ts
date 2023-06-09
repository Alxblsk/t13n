import { DEFAULT_RANGE_SEPARATOR } from "./defaults";
import { Dictionary, Ruleset } from "./types";

function getValue(symbol: string, ruleset: Ruleset) {
  const { ignore, defaultValue = "" } = ruleset[symbol];

  if (ignore) {
    return symbol;
  }

  return defaultValue;
}

export function compileDictionary(ruleset: Ruleset) {
  if (!ruleset) {
    console.warn("No library object passed");
    return {};
  }

  let dictionary: Dictionary = {};

  dictionary = Object.keys(ruleset).reduce(function (acc, symbol) {
    if (!ruleset[symbol]) {
      return acc;
    }

    const { upper, symbolicLink, ignore, ...restSettings } = ruleset[symbol];

    if (restSettings.type === "R") {
      const [from, to] = symbol.split(DEFAULT_RANGE_SEPARATOR);

      if (!!from && !!to) {
        const charFrom = from.codePointAt(0) || Number.MAX_SAFE_INTEGER;
        const charTo = to.codePointAt(0) || -1;

        for (let rangeChar = charFrom; rangeChar <= charTo; rangeChar++) {
          const rangeSymbol = String.fromCodePoint(rangeChar);
          acc[rangeSymbol] = { ...restSettings, defaultValue: rangeSymbol };
        }
      }

      return acc;
    }

    if (ignore) {
      acc[symbol] = { ...restSettings, defaultValue: getValue(symbol, ruleset) };
      return acc;
    }

    if (symbolicLink && ruleset[symbolicLink]) {
      acc[symbol] = { ...restSettings, defaultValue: "", ...ruleset[symbolicLink] };
      return acc;
    }

    if (restSettings.type === "L") {
      acc[symbol.toUpperCase()] = {
        ...restSettings,
        isUpperCase: true,
        defaultValue: getValue(symbol, ruleset),
      };
    }

    acc[symbol] = {
      ...restSettings,
      isUpperCase: false,
      defaultValue: getValue(symbol, ruleset),
    };
    return acc;
  }, dictionary);

  return dictionary;
}
