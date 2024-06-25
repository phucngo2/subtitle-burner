import { INVOKE_FFMPEG_VERSION_EVENT } from "@/config/events.config";
import { invoke } from "@tauri-apps/api";

export const useInvokeFFmpegVersionEvent = () => {
  return () => {
    return invoke(INVOKE_FFMPEG_VERSION_EVENT);
  };
};
