import { assert } from 'chai';
import { latinize } from './index.js';

// https://ru.wikipedia.org/wiki/Романизация_белорусского_текста_BGN/PCGN
describe('BE / Single Word Assetion (BGN/PCGN)', function () {
    let words = {
        "піяўка": "piyawka",
        "варажун": "varazhun",
        "голад": "holad",
        "холад": "kholad",
        "гузік": "guzik",
        "ганак": "ganak",
        "гонт": "gont",
        "мазгі": "mazgi",
        "мязга": "myazga"
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

    let places = {
        "Антон": "Anton",
        "Вілейка": "Vilyeyka",
        "Брэст": "Brest",
        "Дубна": "Dubna"
    }

    Object.keys(places).map((place) => {
        it(`should transliterate the name ${place} correctly`, function () {
            assert.equal(latinize(place), places[place]);
        });
    });
});