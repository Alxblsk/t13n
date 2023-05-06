enum SoundType {
    V = "VOWEL",
    C = "CONSONANT"
}

enum RuleType {
    L = "LETTER",
    S = "SYMBOL",
    R = "RANGE"
}

export interface AltValueRule {
    value: string;
    firstLetter?: boolean;
    prevLettersInclude?: string[];
    nextLettersInclude?: string[];
}

interface Rule {
    type: string;
    sound?: string;
    defaultValue?: string;
    upper?: string;
    ignore?: boolean;
    unsafe?: boolean;
    fallback?: string;
    symbolicLink?: string;
    altValues?: AltValueRule[]
}

export interface Ruleset {
    [symbol: string]: Rule
}

export interface DictionaryRecord {
    defaultValue: string;
    sound?: string;
    isUpperCase?: boolean;
    altValues?: AltValueRule[]
}

export interface Dictionary {
    [symbol: string]: DictionaryRecord
}

export interface ApplicationSettings {
    language: string, 
    style: string, 
    safeOnly: boolean, 
    extraRuleset?: Ruleset
}

export interface LetterProperties {
    isFirstLetter: boolean;
    isLastLetter: boolean,
    isUpperCase: boolean;
    isPrevVowel: boolean,
    isNextVowel: boolean,
    isPrevConsonant: boolean,
    isNextConsonant: boolean
}

export interface AnalyzerSettings {
    safeOnly: boolean;
}

export interface LanguagesAvailable {
    [lang: string]: Ruleset
}