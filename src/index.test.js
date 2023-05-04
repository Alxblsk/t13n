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
        "мязга": "myazga",
        "надвор’е": "nadvor''ye"
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
        "Дубна": "Dubna",
        "Віцебск": "Vitsyebsk",
        "Асіповічы": "Asipovichy",
        "Гродна": "Hrodna",
        "Брагін": "Brahin",
        "Добруш": "Dobrush",
        "Ліда": "Lida",
        "Гомель": "Homyel'",
        "Беліца": "Byelitsa",
        "Ёдкавічы": "Yodkavichy",
        "Нёман": "Nyoman",
        "Жлобін": "Zhlobin",
        "Ружаны": "Ruzhany",
        "Зоя": "Zoya",
        "князь": "knyaz'",
        "Ігнат": "Ihnat",
        "Мінск": "Minsk",
        "Йосель": "Yosyel'",
        "Койданава": "Koydanava",
        "Крапіўна": "Krapiwna",
        "Менск": "Myensk",
        "Лаўна": "Lawna",
        "Лёсік": "Lyosik",
        "Купала": "Kupala",
        "Вілейка": "Vilyeyka",
        "Міхал": "Mikhal",
        "Вільня": "Vil'nya",
        "Лепель": "Lyepyel'",
        "Магілёў": "Mahilyow",
        "Няміга": "Nyamiha",
        "Наваградак": "Navahradak",
        "Баранавічы": "Baranavichy",
        "Орша": "Orsha",
        "Востраў": "Vostraw",
        "Пінск": "Pinsk",
        "Дняпро": "Dnyapro",
        "Рагачоў": "Rahachow",
        "Сураж": "Surazh",
        "Смаляны": "Smalyany",
        "Арэса": "Aresa",
        "Рось": "Ros'",
        "Талочын": "Talochyn",
        "Масты": "Masty",
        "Уладзімір": "Uladzimir",
        "Бабруйск": "Babruysk",
        "Быхаў": "Bykhaw",
        "Воўпа": "Vowpa",
        "Іўе": "Iwye",
        "Фолюш": "Folyush",
        "фортка": "fortka",
        "Хатынь": "Khatyn'",
        "Быхаў": "Bykhaw",
        "Ганцавічы": "Hantsavichy",
        "Стоўбцы": "Stowbtsy",
        "цьмяны": "ts'myany",
        "мясцовы": "myastsovy",
        "Астравец": "Astravyets",
        "Прыпяць": "Prypyats'",
        "Чэрыкаў": "Cherykaw",
        "Шчара": "Shchara",
        "Нарач": "Narach",
        "Шклоў": "Shklow",
        "Ашмяны": "Ashmyany",
        "Ыттык-Кёль": "Yttyk-Kyol'",
        "Кобрын": "Kobryn",
        "Солы": "Soly",
        "Копысь": "Kopys'",
        "рунь": "run'",
        "Эйсманты": "Eysmanty",
        "Крэва": "Kreva",
        "Юры": "Yury",
        "уюн": "uyun",
        "Язэп": "Yazep",
        "Івянец": "Ivyanyets",
        "з'езд": "z''yezd"
    }

    Object.keys(places).map((place) => {
        it(`should transliterate the name ${place} correctly`, function () {
            assert.equal(latinize(place), places[place]);
        });
    });

    let sentenses = {
        "Гэта быў цяжкі год.": "Heta byw tsyazhki hod.",
        "Папярэдні год быў прасцейшы!": "Papyaredni hod byw prastsyeyshy!",
    }

    Object.keys(sentenses).map((sentense) => {
        it(`should transliterate the sentense ${sentense} correctly`, function () {
            assert.equal(latinize(sentense), sentenses[sentense]);
        });
    });

    let urlSlugs = {
        "Чаму на тэлефоне з'явіўся сімвал #": "Chamu_na_telyefonye_z_yaviwsya_simval__"
    }

    Object.keys(urlSlugs).map((slug) => {
        it(`should transliterate the slug ${slug} correctly`, function () {
            assert.equal(latinize(slug, { safeOnly: true }), urlSlugs[slug]);
        });
    });
    
});