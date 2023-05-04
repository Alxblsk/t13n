import { compileDictionary } from './compile.js';
import { pick } from './pick.js';

export class Analyzer {
    #words = [];

    constructor(line, dictionary, settings) {
        const safeOnly = settings.safeOnly === true;
        const lib = compileDictionary(dictionary, safeOnly);
        
        line.normalize().split(/\s/).forEach((word) => {
            this.#words.push(new WordAnalyzer(word, lib))
        })
    }

    get words() {
        return this.#words;
    }
}

class WordAnalyzer {
    #letters = [];
    #val = "";

    constructor(word, lib) {
        this.#val = word;
        
        word.split("").forEach((letter, index, word) => {
            this.#letters.push(new LetterAnalyzer(word, index, lib))
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
    #props = {};
    #rules = {};
    #val = "";

    constructor(word, index, lib) {
        this.#val = word[index];
        this.#rules = lib[this.#val];
        this.#props = this.analyze(word, index, lib);
    }

    analyze(word, index, lib) {
        if (!(word[index] in lib)) {
            console.warn(`Symbol ${word[index]} (code ${word[index].charCodeAt(0)}) is not available in the library`);
            return {};
        }

        const isFirstLetter = index === 0;
        const isLastLetter = index === word.length - 1;

        const prevLetter = word[index - 1];
        const nextLetter = word[index + 1];

        const hasPrevLetter = !isFirstLetter && !!prevLetter;
        const hasNextLetter = !isLastLetter && !!nextLetter;

        const isUpperCase = lib[word[index]]?.isUpperCase === true;

        return {
            isFirstLetter,
            isLastLetter,

            isUpperCase,
            
            isPrevVowel: hasPrevLetter && lib[prevLetter]?.type === "V",
            isNextVowel: hasNextLetter && lib[nextLetter]?.type === "V",

            isPrevConsonant: hasPrevLetter && lib[prevLetter]?.type === "C",
            isPrevConsonant: hasNextLetter && lib[nextLetter]?.type === "C"
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

    rulesCount(rules) {
        const matchedRules = pick(rules, [
            'firstLetter', 
            'prevLettersInclude',
            'nextLettersInclude'
        ])

        return Object.keys(matchedRules).length;
    }
}