import {
  RENDER_ERROR_EVENT,
  RENDER_SUCCESS_EVENT,
} from "@/config/events.config";
import { Event, UnlistenFn, listen } from "@tauri-apps/api/event";
import { onCleanup, onMount } from "solid-js";

interface Props {
  onSuccess: (event: Event<unknown>) => void;
  onError: (event: Event<unknown>) => void;
}

export const useListenRenderResult = (props: Props) => {
  let successEventRef: Promise<UnlistenFn>;
  let errorEventRef: Promise<UnlistenFn>;
  onMount(() => {
    successEventRef = listen(RENDER_SUCCESS_EVENT, props.onSuccess);
    errorEventRef = listen(RENDER_ERROR_EVENT, props.onError);
  });
  onCleanup(() => {
    successEventRef.then((f) => f());
    errorEventRef.then((f) => f());
  });
};
