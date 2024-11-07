// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    global: require('./public/locales/en/global.json'),
    home: require('./public/locales/en/home.json'),
    header: require('./public/locales/en/header.json'),
    footer: require('./public/locales/en/footer.json'),
    about: require('./public/locales/en/about.json'),
    login: require('./public/locales/en/login.json'),
    signup: require('./public/locales/en/signup.json'),
    'account-settings': require('./public/locales/en/account-settings.json'),
    'confirm-signup': require('./public/locales/en/confirm-signup.json'),
    'forgot-password': require('./public/locales/en/forgot-password.json'),
    'confirm-forgot-password': require('./public/locales/en/confirm-forgot-password.json'),
  },
  fr: {
    global: require('./public/locales/fr/global.json'),
    home: require('./public/locales/fr/home.json'),
    header: require('./public/locales/fr/header.json'),
    footer: require('./public/locales/fr/footer.json'),
    about: require('./public/locales/fr/about.json'),
    login: require('./public/locales/fr/login.json'),
    signup: require('./public/locales/fr/signup.json'),
    'account-settings': require('./public/locales/fr/account-settings.json'),
    'confirm-signup': require('./public/locales/fr/confirm-signup.json'),
    'forgot-password': require('./public/locales/fr/forgot-password.json'),
    'confirm-forgot-password': require('./public/locales/fr/confirm-forgot-password.json'),
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
