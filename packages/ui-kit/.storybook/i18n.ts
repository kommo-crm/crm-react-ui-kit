import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import {
  INITIAL_LANGUAGE,
  SUPPORTED_LANGUAGES,
  Langs,
} from '../storybook/utils';

import locales from '../locales';

i18n.use(LanguageDetector).init({
  supportedLngs: SUPPORTED_LANGUAGES,
  fallbackLng: INITIAL_LANGUAGE,
  resources: locales,
  load: 'currentOnly',
  interpolation: {
    escapeValue: false,
  },
});

i18n.on('languageChanged', (lng: Langs) => {
  if (!SUPPORTED_LANGUAGES.includes(lng)) {
    i18n.changeLanguage(INITIAL_LANGUAGE);
  }
});

export { i18n };
