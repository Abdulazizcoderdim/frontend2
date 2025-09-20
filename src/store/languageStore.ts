import { create } from "zustand";
import { persist } from "zustand/middleware";

type Lang = "uz" | "ru" | "en";

interface LangState {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

export const useLangStore = create<LangState>()(
  persist(
    (set) => ({
      lang: "uz",
      setLang: (lang) => set({ lang }),
    }),
    {
      name: "lang-storage",
    }
  )
);
