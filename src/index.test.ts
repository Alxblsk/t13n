import { assert } from "chai";
import { latinize } from "./index";
import { Ruleset } from "./types";

type TestCases = Record<string, string>;

// https://ru.wikipedia.org/wiki/Романизация_белорусского_текста_BGN/PCGN
describe("Language: BE", function () {
  describe("Style: BGN/PCGN", function () {
    describe("Single Word Assetions", function () {
      let words: TestCases = {
        "піяўка": "piyawka",
        "варажун": "varazhun",
        "голад": "holad",
        "холад": "kholad",
        "гузік": "guzik",
        "ганак": "ganak",
        "гонт": "gont",
        "мазгі": "mazgi",
        "мязга": "myazga",
        "надвор’е": "nadvor''ye",
      };

      Object.keys(words).map((word) => {
        it(`should transliterate the word ${word} correctly`, function () {
          assert.equal(latinize(word), words[word]);
        });
      });
    });

    describe("Absent Letters", function () {
      let wrong_words: TestCases = {
        "Том 🤝 Джэры": "Tom _ Dzhery",
      };

      Object.keys(wrong_words).map((word) => {
        it(`should not transliterate the word ${word} (wrong letters)`, function () {
          assert.equal(latinize(word), wrong_words[word]);
        });
      });
    });

    describe("Geografic Names", function () {
      let places: TestCases = {
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
        "з'езд": "z''yezd",
        "Беларусь": "Byelarus'",
      };

      Object.keys(places).map((place) => {
        it(`should transliterate the name ${place} correctly`, function () {
          assert.equal(latinize(place), places[place]);
        });
      });
    });

    describe("Sentenses", function () {
      let sentenses: TestCases = {
        "Гэта быў цяжкі год.": "Heta byw tsyazhki hod.",
        "Папярэдні год быў прасцейшы!": "Papyaredni hod byw prastsyeyshy!",
      };

      Object.keys(sentenses).map((sentense) => {
        it(`should transliterate the sentense ${sentense} correctly`, function () {
          assert.equal(latinize(sentense), sentenses[sentense]);
        });
      });
    });

    describe("URL slug", function () {
      let urlSlugs: TestCases = {
        "Чаму на тэлефоне з'явіўся сімвал #": "Chamu_na_telyefonye_z_yaviwsya_simval__",
      };

      Object.keys(urlSlugs).map((slug) => {
        it(`should transliterate the slug ${slug} correctly`, function () {
          assert.equal(
            latinize(slug, { language: "be", style: "BGN-PCGN", safeOnly: true }),
            urlSlugs[slug]
          );
        });
      });
    });

    describe("Excluded Ranges", function () {
      let excludedRanges: TestCases = {
        "Мне казалі, што нумар яго кватэры - 46.": "Mnye kazali, shto numar yaho kvatery - 46.",
        'Матуля заўсёды спявала мне "I will allways love you"':
          'Matulya zawsyody spyavala mnye "I will allways love you"',
      };

      Object.keys(excludedRanges).map((rangeItem) => {
        it(`should ignore ranges of symbols in ${rangeItem} correctly`, function () {
          assert.equal(latinize(rangeItem), excludedRanges[rangeItem]);
        });
      });
    });

    it("should pass extra rule correctly", function () {
      const extraRuleset: Ruleset = {
        ь: { type: "L", sound: "C", defaultValue: "" },
      };
      const result = latinize("Беларусь", {
        language: "be",
        style: "BGN-PCGN",
        safeOnly: false,
        extraRuleset,
      });
      assert.equal(result, "Byelarus");
    });
  });

  describe("Style: Latinka", function () {
    const settings = { language: "be", style: "lacinka", safeOnly: false };

    describe("Sentenses", function () {
      let sentenses: TestCases = {
        "Цяпер мы, Рада Беларускай Народнай Рэспублікі":
          "Ciapier my, Rada Biełaruskaj Narodnaj Respubliki",
        "ськідаем з роднага краю апошняе ярмо дзяржаўнай залежнасьці":
          "śkidajem z rodnaha kraju apošniaje jarmo dziaržaŭnaj zaležnaści",
        "якое гвалтам накінулі расейскія цары на наш вольны і незалежны край":
          "jakoje hvałtam nakinuli rasiejskija cary na naš volny i niezaležny kraj",
        "На моцы гэтага трацяць сілу ўсе старыя дзяржаўныя зьвязі":
          "Na mocy hetaha traciać siłu ŭsie staryja dziaržaŭnyja źviazi",
        "якія далі магчымасьць чужому ўраду падпісаць і за Беларусь трактат у Берасьці":
          "jakija dali mahčymaść čužomu ŭradu padpisać i za Biełaruś traktat u Bieraści",
        "што забівае на сьмерць беларускі народ, дзелячы зямлю яго на часткі":
          "što zabivaje na śmierć biełaruski narod, dzielačy ziamlu jaho na častki",
        "Беларуская Народная Рэспубліка павінна абняць усе землі":
          "Biełaruskaja Narodnaja Respublika pavinna abniać usie ziemli",
        "дзе жыве і мае лічбенную перавагу беларускі народ, а ласьне":
          "dzie žyvie i maje ličbiennuju pieravahu biełaruski narod, a łaśnie",
        "Магілёўшчыну, беларускія часьці Меншчыны, Гродненшчыны (з Гродняй, Беластокам і інш.)":
          "Mahiloŭščynu, biełaruskija čaści Mienščyny, Hrodnienščyny (z Hrodniaj, Biełastokam i inš.)",
        "Чарнігаўшчыны і сумежных часьцяў суседніх губэрняў, заселеных беларусамі":
          "Čarnihaŭščyny i sumiežnych čaściaŭ susiednich huberniaŭ, zasielenych biełarusami",
        "не кажы літару ґ": "nie kažy litaru g",
      };

      Object.keys(sentenses).map((sentense) => {
        it(`should transliterate the sentense ${sentense} correctly`, function () {
          assert.equal(latinize(sentense, settings), sentenses[sentense]);
        });
      });
    });

    describe("Safe symbols only", function () {
      let urlSlugs: TestCases = {
        "беларускі народ": "bielaruski_narod",
        "залежнасьці": "zaleznasci",
        "дзяржаўныя зьвязі": "dziarzaunyja_zviazi",
      };

      Object.keys(urlSlugs).map((slug) => {
        it(`should transliterate the slug ${slug} correctly`, function () {
          assert.equal(
            latinize(slug, { language: "be", style: "lacinka", safeOnly: true }),
            urlSlugs[slug]
          );
        });
      });
    });
  });

  describe("Style: ISO 9 - A", function () {
    const settings = { language: "be", style: "ISO9A", safeOnly: false };

    describe("Sentenses", function () {
      let sentenses: TestCases = {
        "Цяпер мы, Рада Беларускай Народнай Рэспублікі":
          "Câper my, Rada Belaruskaj Narodnaj Rèspublìkì",
        "ськідаем з роднага краю апошняе ярмо дзяржаўнай залежнасьці":
          "sʹkìdaem z rodnaga kraû apošnâe ârmo dzâržaǔnaj zaležnasʹcì",
        "якое гвалтам накінулі расейскія цары на наш вольны і незалежны край":
          "âkoe gvaltam nakìnulì rasejskìâ cary na naš volʹny ì nezaležny kraj",
        "На моцы гэтага трацяць сілу ўсе старыя дзяржаўныя зьвязі":
          "Na mocy gètaga tracâcʹ sìlu ǔse staryâ dzâržaǔnyâ zʹvâzì",
        "якія далі магчымасьць чужому ўраду падпісаць і за Беларусь трактат у Берасьці":
          "âkìâ dalì magčymasʹcʹ čužomu ǔradu padpìsacʹ ì za Belarusʹ traktat u Berasʹcì",
        "што забівае на сьмерць беларускі народ, дзелячы зямлю яго на часткі":
          "što zabìvae na sʹmercʹ belaruskì narod, dzelâčy zâmlû âgo na častkì",
        "Беларуская Народная Рэспубліка павінна абняць усе землі":
          "Belaruskaâ Narodnaâ Rèspublìka pavìnna abnâcʹ use zemlì",
        "дзе жыве і мае лічбенную перавагу беларускі народ, а ласьне":
          "dze žyve ì mae lìčbennuû peravagu belaruskì narod, a lasʹne",
        "Магілёўшчыну, беларускія часьці Меншчыны, Гродненшчыны (з Гродняй, Беластокам і інш.)":
          "Magìlëǔščynu, belaruskìâ časʹcì Menščyny, Grodnenščyny (z Grodnâj, Belastokam ì ìnš.)",
        "Чарнігаўшчыны і сумежных часьцяў суседніх губэрняў, заселеных беларусамі":
          "Čarnìgaǔščyny ì sumežnyh časʹcâǔ susednìh gubèrnâǔ, zaselenyh belarusamì",
      };

      Object.keys(sentenses).map((sentense) => {
        it(`should transliterate the sentense ${sentense} correctly`, function () {
          assert.equal(latinize(sentense, settings), sentenses[sentense]);
        });
      });
    });

    describe("URL slug", function () {
      let urlSlugs: TestCases = {
        "Беларусь": "Belarus",
        "Чаму на тэлефоне з'явіўся сімвал #": "Chamu_na_telefone_z_yaviusya_simval__",
      };

      Object.keys(urlSlugs).map((slug) => {
        it(`should transliterate the slug ${slug} correctly`, function () {
          assert.equal(
            latinize(slug, { language: "be", style: "ISO9A", safeOnly: true }),
            urlSlugs[slug]
          );
        });
      });
    });
  });
});
