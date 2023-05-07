import { Analyzer } from "./analyzer";
import { Processor } from "./processor";

import common from "./ruleset/common.json";
import be_BGN from "./ruleset/language/be_BGN-PCGN.json";
import { ApplicationSettings, LanguagesAvailable } from "./types";

const LANGUAGES: LanguagesAvailable = {
  "be_BGN-PCGN": be_BGN,
};

const DEFAULTS: ApplicationSettings = {
  language: "be",
  style: "BGN-PCGN",
  safeOnly: false,
  extraRuleset: {},
};

export function latinize(line: string, incomingSettings: ApplicationSettings = DEFAULTS) {
  if (!line) {
    return "";
  }

  const settings = { ...DEFAULTS, ...incomingSettings };
  const desiredRuleset = LANGUAGES[`${settings.language}_${settings.style}`];

  if (!desiredRuleset) {
    throw new Error(`
            E001: No Ruleset Found. Your language/transliteration style is not supported yet. 
            Available options: ${Object.keys(LANGUAGES).join(",")}.
        `);
  }

  const ruleset = { ...common, ...desiredRuleset, ...settings.extraRuleset };
  const analyzed = new Analyzer(line, ruleset, settings);

  return new Processor(analyzed, settings.safeOnly).process();
}
