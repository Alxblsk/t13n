import { assert } from 'chai';
import { latinize } from './index.js';

describe('Single Word Assetion', function () {
    let words = {
        "піяўка": "piiauka",
        "варажун": "varazhun",
        "голад": "holad",
        "холад": "kholad",
        "гузік": "guzik",
        "ганак": "ganak",
        "гонт": "gont",
        "мазгі": "mazgi",
        "мязга": "miazga"
    }
    
    Object.keys(words).map((word) => {
        it(`should transliterate the word ${word} correctly`, function () {
            assert.equal(latinize(word), words[word]);
        });
    });

    let wrong_words = {
        "мaзгi": "m_zg_"
    }

    Object.keys(wrong_words).map((word) => {
        it(`should not transliterate the word ${word} (wrong letters)`, function () {
            assert.equal(latinize(word), wrong_words[word]);
        });
    });
});