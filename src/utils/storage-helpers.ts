import { KEY_THEME } from "@/config/storage.config";

export const AppStorage = {
  setTheme(theme: string) {
    localStorage.setItem(KEY_THEME, theme);
  },
  getTheme() {
    return localStorage.getItem(KEY_THEME);
  },
};
