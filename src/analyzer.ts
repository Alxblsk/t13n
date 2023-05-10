import { compileDictionary } from "./compile";
import { pick } from "./pick";
import {
  Dictionary,
  LetterProperties,
  Ruleset,
  DictionaryRecord,
  AltValueRule,
  IAnalyzer,
  IWordAnalyzer,
  ILetterAnalyzer,
} from "./types";

export class Analyzer implements IAnalyzer {
  private _words: WordAnalyzer[] = [];

  constructor(line: string, ruleset: Ruleset) {
    const dictionary = compileDictionary(ruleset);

    line
      .normalize()
      .split(/\s/)
      .forEach((word) => {
        this._words.push(new WordAnalyzer(word, dictionary));
      });
  }

  get words() {
    return this._words;
  }
}

class WordAnalyzer implements IWordAnalyzer {
  private _letters: LetterAnalyzer[] = [];
  private _val = "";

  constructor(word: string, dictionary: Dictionary) {
    this._val = word;

    Array.from(word).forEach((letter, index, all) => {
      this._letters.push(new LetterAnalyzer(all, index, dictionary));
    });
  }

  get letters() {
    return this._letters;
  }

  get value() {
    return this._val;
  }
}

class LetterAnalyzer implements ILetterAnalyzer {
  private _props: LetterProperties;
  private _rules: DictionaryRecord;
  private _val: string = "";

  constructor(word: string[], index: number, dictionary: Dictionary) {
    this._val = word[index];
    this._rules = dictionary[this._val];
    this._props = this.analyze(word, index, dictionary);
  }

  analyze(word: string[], index: number, dictionary: Dictionary): LetterProperties {
    if (!(word[index] in dictionary)) {
      console.warn(
        `Symbol ${word[index]} (code ${word[index].codePointAt(0)}) is not available in the library`
      );
      return {
        isFirstLetter: false,
        isLastLetter: false,
        isUpperCase: false,
        isPrevVowel: false,
        isNextVowel: false,
        isPrevConsonant: false,
        isNextConsonant: false,
      };
    }

    const isFirstLetter = index === 0;
    const isLastLetter = index === word.length - 1;

    const prevLetter = word[index - 1];
    const nextLetter = word[index + 1];

    const hasPrevLetter = !isFirstLetter && !!prevLetter;
    const hasNextLetter = !isLastLetter && !!nextLetter;

    const isUpperCase = dictionary[word[index]]?.isUpperCase === true;

    return {
      isFirstLetter,
      isLastLetter,

      isUpperCase,

      isPrevVowel: hasPrevLetter && dictionary[prevLetter]?.sound === "V",
      isNextVowel: hasNextLetter && dictionary[nextLetter]?.sound === "V",

      isPrevConsonant: hasPrevLetter && dictionary[prevLetter]?.sound === "C",
      isNextConsonant: hasNextLetter && dictionary[nextLetter]?.sound === "C",
    };
  }

  get properties() {
    return this._props;
  }

  get value() {
    return this._val;
  }

  get rules() {
    return this._rules;
  }

  rulesCount(rules: AltValueRule) {
    const matchedRules = pick(rules, ["firstLetter", "prevLettersInclude", "nextLettersInclude"]);

    return Object.keys(matchedRules).length;
  }
}
