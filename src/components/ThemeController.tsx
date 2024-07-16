import { THEMES } from "@/config/themes.config";
import { appTheme, setAppTheme } from "@/signals";
import { capitalizeFirstLetter } from "@/utils";
import { Component, For, JSX } from "solid-js";

export const ThemeController: Component<{}> = () => {
  const onThemeItemClick: JSX.EventHandler<HTMLInputElement, Event> = (
    event
  ) => {
    let value = (event.target as HTMLInputElement).value;
    setAppTheme(value);
  };

  return (
    <div class="w-full form-control">
      <div class="label">
        <span class="label-text">Theme</span>
      </div>
      <div class="join w-full">
        <For each={THEMES}>
          {(theme) => (
            <input
              type="radio"
              name="theme-buttons"
              class="btn join-item"
              aria-label={capitalizeFirstLetter(theme)}
              value={theme}
              onClick={onThemeItemClick}
              checked={appTheme() === theme}
            />
          )}
        </For>
      </div>
    </div>
  );
};
