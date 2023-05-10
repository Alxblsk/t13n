import { DEFAULT_FALLBACK } from "./defaults";
import { LetterProperties } from "./types";

interface WordSettings {
  unsafe: boolean;
  fallback: string;
}

export function restoreCase(letter: string, props: LetterProperties, settings: WordSettings) {
  const trueLetter = settings.unsafe ? settings.fallback || DEFAULT_FALLBACK : letter;

  if (letter && props.isUpperCase === true) {
    const [first, ...rest] = trueLetter.split("");

    return [first.toUpperCase(), ...rest].join("");
  }

  return trueLetter;
}
