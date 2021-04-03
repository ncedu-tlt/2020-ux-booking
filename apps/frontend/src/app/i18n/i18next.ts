import { I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { APP_INITIALIZER, LOCALE_ID } from '@angular/core';

export const languages = ['en', 'ru'];

export function appInit(i18next: ITranslationService) {
  return () =>
    i18next
      .use(XHR)
      .use(LanguageDetector)
      .init({
        whitelist: languages,
        fallbackLng: 'en',
        debug: false,
        backend: {
          loadPath: 'assets/locales/{{lng}}.json'
        },
        detection: {
          order: ['cookie', 'navigator'],
          lookupCookie: 'lang'
        }
      });
}

export function localeIdFactory(i18next: ITranslationService) {
  return i18next.language;
}

export const I18N_PROVIDERS = [
  {
    provide: APP_INITIALIZER,
    useFactory: appInit,
    deps: [I18NEXT_SERVICE],
    multi: true
  },
  {
    provide: LOCALE_ID,
    deps: [I18NEXT_SERVICE],
    useFactory: localeIdFactory
  }
];
