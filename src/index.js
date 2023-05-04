import { Analyzer } from './analyzer.js';
import { restoreCase } from './restore.js';
import { DEFAULT_FALLBACK, DEFAULT_SPACE } from './defaults.js';
import be from './lang/be.json' assert {
    type: 'json',
    integrity: 'sha384-ABC123'
};


export function latinize(line, settings = {}) {
    if (!line) {
        return "";
    }

    const analyzed = new Analyzer(line, be, settings);

    const result = analyzed.words.map((word) => {
        const latinSymbols = word.letters.map((letter, lIndex) => {
            const rules = letter.rules;
            const properties = letter.properties;

            if (rules === undefined) {
                return "_";
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
                        return restoreCase(altRules.value, properties);
                    }

                }
            }

            return restoreCase(rules.defaultValue, properties);
        })

        return latinSymbols.join("");
    })

    return result.join(settings.safeOnly ? DEFAULT_FALLBACK : DEFAULT_SPACE);
}