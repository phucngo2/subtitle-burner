import { FFMPEG_DOWNLOAD_PROGRESS_EVENT } from "@/config/events.config";
import { Event, UnlistenFn, listen } from "@tauri-apps/api/event";
import { onCleanup, onMount } from "solid-js";

export interface DownloadProgressPayload {
  percent: number;
  downloaded_mb: number;
  total_mb: number;
}

export const useListenFFmpegDownloadProgress = (
  callback: (event: Event<DownloadProgressPayload>) => void
) => {
  let eventRef: Promise<UnlistenFn>;
  onMount(() => {
    eventRef = listen(FFMPEG_DOWNLOAD_PROGRESS_EVENT, callback);
  });
  onCleanup(() => {
    eventRef.then((f) => f());
  });
};
