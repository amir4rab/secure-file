export interface KeyValue {
  [ name: string ]: string
}

export interface NameSpace {
  [ name: string ]: KeyValue
};

export interface NameSpaces {
  [ name: string ]: NameSpace
};

export type I18nConfig = {
  locales: string[],
  defaultLocale: string,
  nameSpaces: NameSpaces
}