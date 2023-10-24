import { create } from "zustand";
import { LanguagesSupported, Subscription } from "@/typings";

export const LanguagesSupportedMap: Record<LanguagesSupported, string> = {
  en: "English",
  de: "German",
  fr: "French",
  es: "Spanish",
  hi: "Hindi",
  ja: "Japanese",
  la: "latin",
  ru: "Russian",
  zh: "Mandarin",
  ar: "Arabic",
};

const FREE_LANGUAGES = 2;

interface LanguageState {
  language: LanguagesSupported;
  setLanguage: (language: LanguagesSupported) => void;
  getLanguages: (isPro: boolean) => string[];
  getNotSupportedLanguages: (isPro: boolean) => string[];
}

export const useLanguageStore = create<LanguageState>((set, get) => ({
  language: "en",
  setLanguage: (language: LanguagesSupported) => set({ language }),
  getLanguages: (isPro: boolean) => {
    if (isPro) {
      return Object.keys(LanguagesSupportedMap);
    }
    return Object.keys(LanguagesSupportedMap).slice(0, FREE_LANGUAGES);
  },
  getNotSupportedLanguages: (isPro: boolean) => {
    if (isPro) {
      return [];
    }

    return Object.keys(LanguagesSupportedMap).slice(FREE_LANGUAGES);
  },
}));

interface SubscriptionState {
  subscription: Subscription | null | undefined;
  setSubscription: (subscription: Subscription | null) => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  subscription: undefined,
  setSubscription: (subscription: Subscription | null) => set({ subscription }),
}));
