import { invoke } from "@tauri-apps/api";

export const useInvokeFFmpegUninstallEvent = () => {
  return () => {
    return invoke("uninstall_ffmpeg");
  };
};
