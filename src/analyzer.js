export class Analyzer {
    #words = [];

    constructor(line, lib) {
        line.normalize().split(" ").forEach((word) => {
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
        const isFirstLetter = index === 0;
        const isLastLetter = index === word.length - 1;

        const prevLetter = word[index - 1];
        const nextLetter = word[index + 1];

        const hasPrevLetter = !isFirstLetter && !!prevLetter;
        const hasNextLetter = !isLastLetter && !!nextLetter;

        return {
            isFirstLetter,
            isLastLetter,
            
            isPrevVowel: hasPrevLetter && lib[prevLetter].type === "V",
            isNextVowel: hasNextLetter && lib[nextLetter].type === "V",

            isPrevConsonant: hasPrevLetter && lib[prevLetter].type === "C",
            isPrevConsonant: hasNextLetter && lib[nextLetter].type === "C"
        }
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
}