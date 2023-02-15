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
    }
  },
  ns: ["translations"],
  defaultNS: "translations",
});

i18n.languages = [languages.english, languages.français, languages.deutsch, languages.español];

export default i18n;
