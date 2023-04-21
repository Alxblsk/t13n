import { assert } from 'chai';
import { latinize } from './index.js';

const words = {
    "піяўка": "piiauka",
    "варажун": "varazhun",
    "гузік": "huzik",
}

describe('Single Word Assetion', function () {
    it('should transliterate words correctly', function () {
        Object.keys(words).map((word) => {
            assert.equal(latinize(word), words[word]);
        });
    });
});