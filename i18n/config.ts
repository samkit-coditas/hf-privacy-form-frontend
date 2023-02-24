import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { languages, path } from "../constants/constants";

i18n.use(initReactI18next).init({
  fallbackLng: languages.english,
  lng: languages.english,
  resources: {
    en: {
      translations: require(`${path}${languages.english}/${languages.english}.json`),
    },
    du: {
      translations: require(`${path}${languages.deutsch}/${languages.deutsch}.json`),
    },
    fr: {
      translations: require(`${path}${languages.français}/${languages.français}.json`),
    },
    es: {
      translations: require(`${path}${languages.español}/${languages.español}.json`),
    },
    jp: {
      translations: require(`${path}${languages.日本語}/${languages.日本語}.json`),
    },
    pg: {
      translations: require(`${path}${languages.Português}/${languages.Português}.json`),
    },
    ch: {
      translations: require(`${path}${languages.中國人}/${languages.中國人}.json`),
    }
  },
  ns: ["translations"],
  defaultNS: "translations",
});

i18n.languages = [languages.english, languages.français, languages.deutsch, languages.español, languages.日本語];

export default i18n;
