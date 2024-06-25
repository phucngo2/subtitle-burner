import { INVOKE_OPEN_FILE_EVENT } from "@/config/events.config";
import { invoke } from "@tauri-apps/api";

export const useInvokeOpenFileEvent = () => {
  return (path: string) => {
    invoke(INVOKE_OPEN_FILE_EVENT, {
      filePath: path,
    });
  };
};
