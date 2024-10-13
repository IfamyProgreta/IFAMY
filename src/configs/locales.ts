import enMessages from "@/locales/en";
import idMessages from "@/locales/id"; // Import pesan untuk bahasa Indonesia

const supported = ["en", "id"]; // Tambahkan 'id' untuk Indonesia
let locale = "en";

try {
  const { 0: browserLang } = navigator.language.split("-");
  if (supported.includes(browserLang)) locale = browserLang;
} catch (e) {
  console.log(e);
}

export default {
  // current locale
  locale,

  // when translation is not available fallback to that locale
  fallbackLocale: "en",

  // availabled locales for user selection
  availableLocales: [
    {
      code: "en",
      flag: "us",
      name: "united-states",
      label: "English",
      messages: enMessages,
    },
    {
      code: "id", // Bahasa Indonesia
      flag: "id",
      name: "indonesia",
      label: "Bahasa Indonesia",
      messages: idMessages, // Tambahkan pesan bahasa Indonesia
    },
  ],
  messages: {
    en: enMessages,
    id: idMessages, // Tambahkan pesan bahasa Indonesia
  },
};
