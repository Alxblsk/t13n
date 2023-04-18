import { assert } from 'chai';
import { latinize } from './index.js';

describe('Single Word Assetion', function () {
    it('should transliterate words correctly', function () {
        const word = "піяука";
        assert.equal(latinize(word), 'piiauka');
    });
});