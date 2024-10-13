import { createI18n } from "vue-i18n";
import locales from "@/configs/locales";
const messages = locales.messages;
const i18n = createI18n({
  legacy: false,
  locale: locales.locale, // Tetapkan bahasa default
  fallbackLocale: locales.fallbackLocale, // Setel bahasa cadangan
  messages,
});

export default i18n;
