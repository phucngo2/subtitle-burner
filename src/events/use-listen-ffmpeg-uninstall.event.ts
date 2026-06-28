import {
  FFMPEG_UNINSTALL_FAILED_EVENT,
  FFMPEG_UNINSTALL_SUCCESS_EVENT,
} from "@/config/events.config";
import { Event, UnlistenFn, listen } from "@tauri-apps/api/event";
import { onCleanup, onMount } from "solid-js";

interface Props {
  onSuccess: (event: Event<unknown>) => void;
  onError: (event: Event<unknown>) => void;
}

export const useListenFFmpegUninstallResult = (props: Props) => {
  let successEventRef: Promise<UnlistenFn>;
  let errorEventRef: Promise<UnlistenFn>;
  onMount(() => {
    successEventRef = listen(FFMPEG_UNINSTALL_SUCCESS_EVENT, props.onSuccess);
    errorEventRef = listen(FFMPEG_UNINSTALL_FAILED_EVENT, props.onError);
  });
  onCleanup(() => {
    successEventRef.then((f) => f());
    errorEventRef.then((f) => f());
  });
};
