import { useListenFFmpegDownloadResult } from "@/events/use-listen-ffmpeg-download.event";
import { useListenFFmpegDownloadProgress } from "@/events/use-listen-ffmpeg-download-progress.event";
import {
  FFMPEG_STATE,
  setFFmpegState,
  setFFmpegDownloadProgress,
  setFFmpegDownloadedMb,
  setFFmpegTotalMb,
} from "@/signals/ffmpeg-info.signal";

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

  useListenFFmpegDownloadProgress((event) => {
    const { percent, downloaded_mb, total_mb } = event.payload;
    setFFmpegDownloadProgress(percent);
    setFFmpegDownloadedMb(downloaded_mb);
    setFFmpegTotalMb(total_mb);
  });
};
