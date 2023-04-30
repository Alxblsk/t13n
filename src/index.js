import { Analyzer } from './analyzer.js';
import be from './lang/be.json' assert {
    type: 'json',
    integrity: 'sha384-ABC123'
  };;


export function latinize(line) {
    if (!line) {
        return "";
    }

    const analyzed = new Analyzer(line, be);

    const result = [];

    analyzed.words.forEach((word) => {
        word.letters.forEach((letter, lIndex) => {
            const rules = letter.rules;
            const properties = letter.properties;

            if (rules === undefined) {
                result.push("_");
                return false;
            }
    
            if (Array.isArray(rules?.altValues)) {
                for (let altRules of rules.altValues) {
                    const countToMatch = letter.rulesCount(altRules);
                    let rulesMatched = 0;

                    if (altRules.firstLetter && properties.isFirstLetter) {
                        rulesMatched++;
                    }

                    if (altRules.nextLettersInclude) {
                        const hasMatch = altRules.nextLettersInclude.some(part => {
                            return word.value.startsWith(part, lIndex + 1);
                        });

                        if (hasMatch) {
                            rulesMatched++;
                        }
                    }
                    
                    if (altRules.prevLettersInclude) {
                        const hasMatch = altRules.prevLettersInclude.some(part => {
                            return word.value.endsWith(part, lIndex);
                        });

                        if (hasMatch) {
                            rulesMatched++;
                        }
                    }

                    if (countToMatch === rulesMatched) {
                        result.push(altRules.value);
                        return false;
                    }

                }
                // more logic here for alternative sounds befor applying a default one
            }
    
            result.push(rules.defaultValue);
        })
    })

    return result.join("");
}