import { FFMPEG_STATE, ffmpegState, ffmpegDownloadProgress } from "@/signals/ffmpeg-info.signal";
import { Component, JSXElement, Match, Switch } from "solid-js";

interface Props {
  children: JSXElement;
}

export const FFmpegMessage: Component<Props> = (props) => {
  return (
    <div class="chat chat-start w-full flex flex-row">
      <div class="chat-image mr-3">{props.children}</div>
      <Switch fallback={<></>}>
        <Match when={ffmpegState() == FFMPEG_STATE.NOT_INSTALLED}>
          <div class="chat-bubble">
            <div>🥲 FFmpeg is not installed! 😥</div>
            <div>Please go to the Settings to install FFmpeg!</div>
          </div>
        </Match>
        <Match when={ffmpegState() == FFMPEG_STATE.ERROR}>
          <div class="chat-bubble">
            <div>😵 FFmpeg failed to install! 😨</div>
          </div>
        </Match>
        <Match when={ffmpegState() == FFMPEG_STATE.INSTALLING}>
          <div class="chat-bubble">
            <div>🤖 Installing FFmpeg... {ffmpegDownloadProgress()}% 🚀</div>
            <progress class="progress progress-secondary w-full mt-3" value={ffmpegDownloadProgress()} max="100"></progress>
          </div>
        </Match>
        <Match when={ffmpegState() == FFMPEG_STATE.INSTALLED}>
          <div class="chat-bubble">
            <div>🐱 FFmpeg installed! 😊</div>
          </div>
        </Match>
      </Switch>
    </div>
  );
};
