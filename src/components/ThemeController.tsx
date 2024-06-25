import { Component } from "solid-js";

export const ThemeController: Component<{}> = () => {
  return (
    <div class="w-full form-control">
      <div class="label">
        <span class="label-text">Theme</span>
      </div>
      <div class="join w-full">
        <input
          type="radio"
          name="theme-buttons"
          class="btn theme-controller join-item"
          aria-label="Dark"
          value="dark"
          checked
        />
        <input
          type="radio"
          name="theme-buttons"
          class="btn theme-controller join-item"
          aria-label="Synthwave"
          value="synthwave"
        />
        <input
          type="radio"
          name="theme-buttons"
          class="btn theme-controller join-item"
          aria-label="Night"
          value="night"
        />
        <input
          type="radio"
          name="theme-buttons"
          class="btn theme-controller join-item"
          aria-label="Dracula"
          value="dracula"
        />
        <input
          type="radio"
          name="theme-buttons"
          class="btn theme-controller join-item"
          aria-label="Business"
          value="business"
        />
        <input
          type="radio"
          name="theme-buttons"
          class="btn theme-controller join-item"
          aria-label="Dim"
          value="dim"
        />
      </div>
    </div>
  );
};
