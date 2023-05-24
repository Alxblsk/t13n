import { DEFAULT_FALLBACK } from "./defaults";
import { LetterProperties } from "./types";

interface WordSettings {
  unsafe: boolean;
  fallback: string;
}

export function restoreCase(letter: string, props: LetterProperties, settings: WordSettings) {
  const fallback = settings.fallback !== undefined ? settings.fallback : DEFAULT_FALLBACK;
  const trueLetter = settings.unsafe ? fallback : letter;

  if (trueLetter && props.isUpperCase === true) {
    const [first, ...rest] = trueLetter.split("");

    return [first.toUpperCase(), ...rest].join("");
  }

  return trueLetter;
}
