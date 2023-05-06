import { LetterProperties } from "./types";

export function restoreCase(letter: string, props: LetterProperties) {
  if (letter && props.isUpperCase === true) {
    const [first, ...rest] = letter.split("");

    return [first.toUpperCase(), ...rest].join("");
  }

  return letter;
}
