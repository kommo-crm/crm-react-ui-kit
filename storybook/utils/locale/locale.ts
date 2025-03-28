import LanguageDetector from 'i18next-browser-languagedetector';

import { Locale, Langs } from './locale.types';

export const LOCALE_LIST: Locale[] = [
  { value: Langs.en, title: '🇺🇸 English' },
  { value: Langs.es, title: '🇪🇸 Español' },
  { value: Langs.pt, title: '🇵🇹 Português' },
];

export const SUPPORTED_LANGUAGES: Langs[] = LOCALE_LIST.map(
  (locale) => locale.value
);

export const getLocale = (value: Langs) =>
  LOCALE_LIST.find((locale) => locale.value === value) || LOCALE_LIST[0];

const languageDetector = new LanguageDetector();

languageDetector.init({
  order: ['navigator', 'localStorage', 'cookie', 'sessionStorage', 'htmlTag'],
  lookupLocalStorage: 'i18nextLng',
  lookupCookie: 'i18next',
  lookupSessionStorage: 'i18nextLng',
  caches: ['localStorage', 'cookie'],
});

const detectedLanguage = languageDetector.detect() as Langs;

export const INITIAL_LOCALE = getLocale(detectedLanguage);
export const INITIAL_LANGUAGE = INITIAL_LOCALE.value;
