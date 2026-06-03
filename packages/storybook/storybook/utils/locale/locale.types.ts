export enum Langs {
  en = 'en_US',
  es = 'es_ES',
  pt = 'pt_PT',
}

export interface Locale {
  /**
   * Language value
   */
  value: Langs;
  /**
   * Displayed title
   */
  title: string;
}
