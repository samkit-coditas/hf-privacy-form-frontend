"use client";

import { useState, createContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../../i18n/config";

import { languages } from "../../constants/constants";
import { ILanguageProviderProps } from "./languageProvider.types";

export const LanguageContext = createContext<any>({});
export const LanguageProvider = (props: ILanguageProviderProps) => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(languages.english);
  const [localString, setLocalString] = useState<any>({});

  useEffect(() => {
    language &&
      setLocalString(i18n.getResourceBundle(language, "translations"));
  }, [i18n, language]);

  return (
    <LanguageContext.Provider
      value={{
        localString: localString,
        setLanguage: setLanguage,
        language: language,
      }}
    >
      {props.children}
    </LanguageContext.Provider>
  );
};
