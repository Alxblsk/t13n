import { compileDictionary } from './compile';
import { pick } from './pick';
import { AnalyzerSettings, Dictionary, LetterProperties, Ruleset, DictionaryRecord, AltValueRule } from './types';

export class Analyzer {
    #words: WordAnalyzer[] = [];

    constructor(line: string, ruleset: Ruleset, settings: AnalyzerSettings) {
        const safeOnly = settings.safeOnly === true;
        const dictionary = compileDictionary(ruleset, safeOnly);
        
        line.normalize().split(/\s/).forEach((word) => {
            this.#words.push(new WordAnalyzer(word, dictionary))
        })
    }

    get words() {
        return this.#words;
    }
}

class WordAnalyzer {
    #letters: LetterAnalyzer[] = [];
    #val = "";

    constructor(word: string, dictionary: Dictionary) {
        this.#val = word;
        
        Array.from(word).forEach((letter, index, all) => {
            this.#letters.push(new LetterAnalyzer(all, index, dictionary))
        })
    }

    get letters() {
        return this.#letters;
    }

    get value() {
        return this.#val;
    }
}

class LetterAnalyzer {
    #props: LetterProperties;
    #rules: DictionaryRecord;
    #val: string = "";

    constructor(word: string[], index: number, dictionary: Dictionary) {
        this.#val = word[index];
        this.#rules = dictionary[this.#val];
        this.#props = this.analyze(word, index, dictionary);
    }

    analyze(word: string[], index: number, dictionary: Dictionary): LetterProperties {
        if (!(word[index] in dictionary)) {
            console.warn(`Symbol ${word[index]} (code ${word[index].codePointAt(0)}) is not available in the library`);
            return {
                isFirstLetter: false,
                isLastLetter: false,
                isUpperCase: false,
                isPrevVowel: false,
                isNextVowel: false,
                isPrevConsonant: false,
                isNextConsonant: false
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
            isNextConsonant: hasNextLetter && dictionary[nextLetter]?.sound === "C"
        };
    }

    get properties() {
        return this.#props;
    }

    get value() {
        return this.#val;
    }

    get rules() {
        return this.#rules;
    }

    rulesCount(rules: AltValueRule) {
        const matchedRules = pick(rules, [
            'firstLetter', 
            'prevLettersInclude',
            'nextLettersInclude'
        ])

        return Object.keys(matchedRules).length;
    }
}