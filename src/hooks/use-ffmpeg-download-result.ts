import { useListenFFmpegDownloadResult } from "@/events/use-listen-ffmpeg-download.event";
import { FFMPEG_STATE, setFFmpegState } from "@/signals/ffmpeg-info.signal";

export const useFFmpegDownloadResult = () => {
  useListenFFmpegDownloadResult({
    onSuccess() {
      setFFmpegState(FFMPEG_STATE.INSTALLED);
      window.location.reload();
    },
    onError() {
      setFFmpegState(FFMPEG_STATE.ERROR);
    },
  });
};
