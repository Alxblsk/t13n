import { restoreCase } from "./restore";
import { DEFAULT_FALLBACK, DEFAULT_SPACE } from "./defaults";
import { LetterProperties, AltValueRule, IAnalyzer, IWordAnalyzer, ILetterAnalyzer } from "./types";

export class Processor {
  private _analyzedText: IAnalyzer;
  private _safeJoin: boolean;

  constructor(analyzedText: IAnalyzer, safeJoin: boolean = false) {
    this._analyzedText = analyzedText;
    this._safeJoin = safeJoin;
  }

  process() {
    const transformed = this.transform(this._analyzedText);
    return transformed.join(this._safeJoin ? DEFAULT_FALLBACK : DEFAULT_SPACE);
  }

  transform(analyzed: IAnalyzer) {
    return analyzed.words.map((word) => {
      const latinSymbols = word.letters.map((letter, lIndex) => {
        const rules = letter.rules;
        const properties = letter.properties;

        if (rules === undefined) {
          return "_";
        }

        if (Array.isArray(rules?.altValues)) {
          for (let altRules of rules.altValues) {
            const isMatch = this.checkAltRule(altRules, properties, {
              word,
              letter,
              lIndex,
            });

            if (isMatch) {
              return restoreCase(altRules.value, properties);
            }
          }
        }

        return restoreCase(rules.defaultValue, properties);
      });

      return latinSymbols.join("");
    });
  }

  checkAltRule(
    altRules: AltValueRule,
    properties: LetterProperties,
    { word, letter, lIndex }: { word: IWordAnalyzer; letter: ILetterAnalyzer; lIndex: number }
  ) {
    const countToMatch = letter.rulesCount(altRules);
    let rulesMatched = 0;

    if (altRules.firstLetter && properties.isFirstLetter) {
      rulesMatched++;
    }

    if (altRules.lastLetter && properties.isLastLetter) {
      rulesMatched++;
    }

    if (altRules.nextLettersInclude) {
      const hasMatch = altRules.nextLettersInclude.some((part: string) => {
        return word.value.startsWith(part, lIndex + 1);
      });

      if (hasMatch) {
        rulesMatched++;
      }
    }

    if (altRules.prevLettersInclude) {
      const hasMatch = altRules.prevLettersInclude.some((part: string) => {
        return word.value.endsWith(part, lIndex);
      });

      if (hasMatch) {
        rulesMatched++;
      }
    }

    return countToMatch === rulesMatched;
  }
}
