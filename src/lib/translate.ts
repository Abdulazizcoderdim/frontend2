import { useLangStore } from "@/store/languageStore";

type Translations = {
  uz: string;
  ru: string;
  en: string;
};

export function t(texts: Translations): string {
  const { lang } = useLangStore.getState();
  return texts[lang];
}
