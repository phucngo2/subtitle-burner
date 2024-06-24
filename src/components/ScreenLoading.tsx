import { Component } from "solid-js";

export const ScreenLoading: Component<{}> = () => {
  return (
    <div class="w-screen h-screen flex items-center justify-center">
      <span class="loading loading-dots loading-md"></span>
    </div>
  );
};
