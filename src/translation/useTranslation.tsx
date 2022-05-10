import { useTranslationContext } from './translationProvider';

export interface Values {
  [ name: string ]: string | number;
}

const useTranslation = ( nameSpace: string ) => {
  const { lang, nameSpaces } = useTranslationContext();

  const t = ( key: string, values: Values | null= null ): string => {
    if ( !nameSpaces.hasOwnProperty(nameSpace) ) {
      console.error(`useTranslation: ${nameSpace} doesn't exists!`)
      return key;
    }
    
    if ( !nameSpaces[nameSpace].hasOwnProperty(lang) ) {
      console.error(`useTranslation: ${nameSpace} doesn't have a values in ${lang}!`);
      return key;
    }

    if ( !nameSpaces[nameSpace][lang].hasOwnProperty(key) ) {
      console.error(`useTranslation: ${nameSpace} doesn't have key ${key}!`);
      return key;
    }

    try {
      let responseString = nameSpaces[nameSpace][lang][key];
      if ( values !== null ) {
        Object.keys(values).forEach( key => {

          const firstPart = String.raw`{{\s*`;
          const secPart = String.raw`\s*}}`;
          const regex = new RegExp(firstPart + key + secPart, 'i');

          responseString = responseString.replace(regex, `${values[key]}`);
        });
      }
      return responseString;

    } catch {
      console.error('useTranslation: something went wrong!')
      return '';
    }
  }

  return ({
    t
  });
}

export default useTranslation