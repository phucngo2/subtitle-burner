import { RENDERING_EVENT } from "@/config/events.config";
import { Event, UnlistenFn, listen } from "@tauri-apps/api/event";
import { onCleanup, onMount } from "solid-js";

export const useRenderEvent = (callback: (event: Event<unknown>) => void) => {
  let eventRef: Promise<UnlistenFn>;
  onMount(() => {
    eventRef = listen(RENDERING_EVENT, callback);
  });
  onCleanup(() => {
    eventRef.then((f) => f());
  });
};
