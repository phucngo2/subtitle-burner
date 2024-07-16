import { AppStorage } from "@/utils";
import { createSignal } from "solid-js";

const initialValue = AppStorage.getTheme() || "dark";
const [appTheme, _setAppTheme] = createSignal(initialValue);

function setAppTheme(theme: string) {
  AppStorage.setTheme(theme);
  _setAppTheme(theme);
}

export { appTheme, setAppTheme };
