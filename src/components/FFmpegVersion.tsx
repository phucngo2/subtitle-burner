import { useInvokeFFmpegDownloadEvent } from "@/events/use-invoke-ffmpeg-download.event";
import {
  FFMPEG_STATE,
  ffmpegState,
  ffmpegVersion,
  setFFmpegState,
  setFFmpegDownloadProgress,
} from "@/signals/ffmpeg-info.signal";
import { TagIcon } from "lucide-solid";
import { Component, Match, Switch } from "solid-js";

export const FFmpegVersion: Component<{}> = () => {
  const invokeDownloadFFmpeg = useInvokeFFmpegDownloadEvent();

  const handleInstall = () => {
    setFFmpegDownloadProgress(0);
    setFFmpegState(FFMPEG_STATE.INSTALLING);
    invokeDownloadFFmpeg();
  };

  const handleUninstall = () => {};
  return (
    <label class="w-full form-control">
      {/* Top Label */}
      <div class="label">
        <span class="label-text">FFmpeg Version</span>
      </div>
      <div class="join">
        {/* Input Component with Icon */}
        <div class="join-item w-full input input-bordered cursor-pointer flex items-center gap-3">
          <TagIcon />
          <input
            type="text"
            class="w-full grow cursor-pointer"
            readonly
            placeholder="FFmpeg not found!"
            value={ffmpegVersion() || "FFmpeg not found!"}
            name="ffmpeg-version"
          />
        </div>

        <Switch
          fallback={
            <button class="join-item btn btn-secondary" onClick={handleInstall}>
              Install
            </button>
          }
        >
          <Match when={ffmpegState() == FFMPEG_STATE.CHECKING}>
            <button class="join-item btn btn-secondary" disabled>
              <span class="loading loading-spinner loading-md"></span>
              Checking
            </button>
          </Match>
          <Match when={ffmpegState() == FFMPEG_STATE.INSTALLING}>
            <button class="join-item btn btn-secondary" disabled>
              <span class="loading loading-spinner loading-md"></span>
              Installing
            </button>
          </Match>
          <Match when={ffmpegState() == FFMPEG_STATE.INSTALLED}>
            <button class="join-item btn btn-error" onClick={handleUninstall}>
              Uninstall
            </button>
          </Match>
        </Switch>
      </div>
    </label>
  );
};
