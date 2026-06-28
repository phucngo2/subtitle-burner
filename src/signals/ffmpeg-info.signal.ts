import { createSignal } from "solid-js";

export const FFMPEG_STATE = {
  CHECKING: "checking...",
  INSTALLING: "installing...",
  UNINSTALLING: "uninstalling...",
  INSTALLED: "installed!",
  NOT_INSTALLED: "not installed!",
  ERROR: "error!!!",
};

const [ffmpegVersion, setFFmpegVersion] = createSignal("");
const [ffmpegState, setFFmpegState] = createSignal(FFMPEG_STATE.CHECKING);
const [ffmpegDownloadProgress, setFFmpegDownloadProgress] = createSignal(0);
const [ffmpegDownloadedMb, setFFmpegDownloadedMb] = createSignal(0);
const [ffmpegTotalMb, setFFmpegTotalMb] = createSignal(0);

export {
  ffmpegVersion,
  setFFmpegVersion,
  ffmpegState,
  setFFmpegState,
  ffmpegDownloadProgress,
  setFFmpegDownloadProgress,
  ffmpegDownloadedMb,
  setFFmpegDownloadedMb,
  ffmpegTotalMb,
  setFFmpegTotalMb,
};

