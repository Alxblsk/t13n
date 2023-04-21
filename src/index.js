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
        word.letters.forEach(letter => {
            const rules = letter.rules;
            
            if (rules === undefined) {
                result.push("_");
                return false;
            }
    
            if (Array.isArray(rules?.altValues)) {
                // more logic here for alternative sounds befor applying a default one
            }
    
            result.push(rules.defaultValue);
        })
    })

    return result.join("");
}