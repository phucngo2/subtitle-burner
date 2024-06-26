import { INVOKE_FFMPEG_DOWNLOAD_EVENT } from "@/config/events.config";
import { invoke } from "@tauri-apps/api";

export const useInvokeFFmpegDownloadEvent = () => {
  return () => {
    return invoke(INVOKE_FFMPEG_DOWNLOAD_EVENT);
  };
};
