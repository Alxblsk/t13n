## T13N: Transliteration Made Right

Welcome the the T13N - a transliteration library for Cyrilic languages written for Javascript applications.

### What is it for?

Transliteration can be made for different purposes, such as:
 * Friendly URLs for Content Management Systems that publish content using Cyrilic languages;
 * Longer SMS;
 * Passport names;
 * Text interpretations for languages that has a dedicated alternative latin alphabets etc.

### Status 

`IN DEVELOPMENT`

### Implementation Checklist

Implementation is split on so-called "phases" for better prioritization.

#### Phase Zero: Belarusian-To-Latin (BGN/PCGN 1979)
  - [x] Define a basic set of rules for each letter;
  - [x] Define a set of flags calculated for each letter for better context;g
  - [x] Define alternative variations for some letters that require it (like 'г');
  - [x] Support the most basic in-between-words separators (dash, underscore) for URL creation support and resolve "similar" symbols ("’" into "'");
  - [ ] Ignore already available latin symbols and digits;
  
#### Phase One: Other Belarusian-To-Latin variations ("Latinka", ICAO, ISO 9)
  - [ ] Reorganize code to support other variations of one language;
  - [ ] Add Belarusian Latin alphabet ("Łacinka");
  - [ ] Add ICAO standard;
  - [ ] Add ISO 9 standard;

#### Phase Two: Ukrainian-To-Latin
  - [ ] Reorganize code to support multiple languages;
  - [ ] Add Ukrainian alphabet and transliteration rules;

#### Phase Three: Russian-To-Latin
 - [ ] Add Russian alphabet and transliteration rules.

_(Other languages to be supported later on)_