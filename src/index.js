import { Analyzer } from './analyzer.js';
import { restoreCase } from './restore.js';
import { DEFAULT_FALLBACK, DEFAULT_SPACE } from './defaults.js';

import common from './ruleset/common.js';
import be_BGN from './ruleset/language/be_BGN-PCGN.js';

const LANGUAGES = {
    'be_BGN-PCGN': be_BGN
}

const DEFAULTS = { language: 'be', style: 'BGN-PCGN', safeOnly: false, extraRuleset: {} };

export function latinize(line, incomingSettings = {}) {
    if (!line) {
        return "";
    }

    const settings = { ...DEFAULTS, ...incomingSettings };
    const desiredRuleset = LANGUAGES[`${settings.language}_${settings.style}`];

    if (!desiredRuleset) {
        throw new Error(`
            E001: No Ruleset Found. Your language/transliteration style is not supported yet. 
            Available options: ${Object.keys(LANGUAGES).join(',')}.
        `);
    }

    const ruleset = { ...common, ...desiredRuleset, ...settings.extraRuleset };
    const analyzed = new Analyzer(line, ruleset, settings);

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