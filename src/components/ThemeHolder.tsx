import { appTheme } from "@/signals";
import { Component } from "solid-js";

export const ThemeHolder: Component<{}> = () => {
  return (
    <input
      type="radio"
      hidden
      class="theme-controller"
      checked
      value={appTheme()}
    />
  );
};
