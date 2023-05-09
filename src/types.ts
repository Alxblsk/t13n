enum SoundType {
  V = "VOWEL",
  C = "CONSONANT",
}

enum RuleType {
  L = "LETTER",
  S = "SYMBOL",
  R = "RANGE",
}

export interface AltValueRule {
  value: string;
  firstLetter?: boolean;
  lastLetter?: boolean;
  prevLettersInclude?: string[];
  nextLettersInclude?: string[];
}

interface RuleLetter {
  type: string;
  sound?: string;
  defaultValue?: string;
  upper?: string;
  altValues?: AltValueRule[];
}

interface RuleSymbol {
  type: string;
  defaultValue?: string;
  ignore?: boolean;
  unsafe?: boolean;
  fallback?: string;
}

interface RuleSymbolicLink {
  type: string;
  symbolicLink?: string;
}

interface Rule extends RuleLetter, RuleSymbol, RuleSymbolicLink {}

export interface Ruleset {
  [symbol: string]: Rule;
}

export interface DictionaryRecord {
  defaultValue: string;
  sound?: string;
  isUpperCase?: boolean;
  altValues?: AltValueRule[];
}

export interface Dictionary {
  [symbol: string]: DictionaryRecord;
}

export interface ApplicationSettings {
  language: string;
  style: string;
  safeOnly: boolean;
  extraRuleset?: Ruleset;
}

export interface LetterProperties {
  isFirstLetter: boolean;
  isLastLetter: boolean;
  isUpperCase: boolean;
  isPrevVowel: boolean;
  isNextVowel: boolean;
  isPrevConsonant: boolean;
  isNextConsonant: boolean;
}

export interface AnalyzerSettings {
  safeOnly: boolean;
}

export interface LanguagesAvailable {
  [lang: string]: Ruleset;
}

export interface IAnalyzer {
  words: IWordAnalyzer[];
}

export interface IWordAnalyzer {
  letters: ILetterAnalyzer[];
  value: string;
}

export interface ILetterAnalyzer {
  value: string;
  rules: any;
  properties: any;

  analyze(word: string[], index: number, dictionary: Dictionary): LetterProperties;
  rulesCount(rules: AltValueRule): number;
}
