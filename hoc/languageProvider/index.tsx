"use client";

import { useState, createContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../../i18n/config";

import { languages } from "../../constants/constants";
import { ILanguageProviderProps } from "./languageProvider.types";

export const LanguageContext = createContext<any>({});
export const LanguageProvider = (props: ILanguageProviderProps) => {
  const [language, setLanguage] = useState(languages.english);

  const { i18n } = useTranslation();

  const [localString, setLocalString] = useState<any>(
    i18n.getResourceBundle(language, "translations")
  );

  useEffect(() => {
    setLocalString(i18n.getResourceBundle(language, "translations"));
  }, [language]);

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
