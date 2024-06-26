import { useInvokeFFmpegVersionEvent } from "@/events/use-invoke-ffmpeg-version.event";
import {
  FFMPEG_STATE,
  setFFmpegState,
  setFFmpegVersion,
} from "@/signals/ffmpeg-info.signal";
import { onMount } from "solid-js";

export const useCheckFFmpegOnMount = () => {
  const invokeFFmpegVersionEvent = useInvokeFFmpegVersionEvent();
  onMount(() => {
    invokeFFmpegVersionEvent().then((value) => {
      if (value) {
        setFFmpegVersion(value as string);
        setFFmpegState(FFMPEG_STATE.INSTALLED);
        return;
      }
      setFFmpegState(FFMPEG_STATE.NOT_INSTALLED);
    });
  });
};
