// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import your translations
import translationEN from './public/locales/en/translation.json';
import translationDE from './public/locales/fr/translation.json';

// const resources = {
//   en: {
//     translation: translationEN,
//   },
//   de: {
//     translation: translationDE,
//   },
// };
const resources = {
  en: {
    global: require('./public/locales/en/global.json'),
    home: require('./public/locales/en/home.json'),
  },
  fr: {
    global: require('./public/locales/fr/global.json'),
    home: require('./public/locales/fr/home.json'),
  },
};
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;