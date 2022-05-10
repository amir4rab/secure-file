import React, { createContext, useContext, useState } from 'react';
import { I18nConfig } from '@/translation/types';
import i18nConfig from 'i18n.config';


// Context
interface ContextValues extends I18nConfig {
  lang: string;
  changeLang: ( v: string ) => void;
}
const defaultValues: ContextValues = {
  nameSpaces: {},
  defaultLocale: 'en',
  locales: [ 'en' ],
  lang: 'en',
  changeLang: () => {},
}
const TranslationContext = createContext(defaultValues);


// Hook
export const useTranslationContext = () => {
  const translationContextValues = useContext(TranslationContext);

  return translationContextValues;
}

// Provider
interface ProviderInterface {
  children: JSX.Element | JSX.Element[];
}
const TranslationProvider = ( { children }: ProviderInterface ) => {
  const [ lang, setLang ] = useState(i18nConfig.defaultLocale);

  const changeLang = ( newLang: string ) => {
    if ( i18nConfig.locales.includes(newLang) ) {
      setLang(newLang)
    }
  }

  const value: ContextValues = {
    ...i18nConfig,
    lang,
    changeLang
  }

  return (
    <TranslationContext.Provider value={ value }>
      { children }
    </TranslationContext.Provider>
  )
}

export default TranslationProvider