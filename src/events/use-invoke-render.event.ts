import {
  INVOKE_RENDER_EVENT,
  INVOKE_RENDER_EVENT_WITHOUT_SUBTITLES,
} from "@/config/events.config";
import { IVideoRenderRequest } from "@/types";
import { formatSubtitleFilePath, generateVideoOutputPath } from "@/utils";
import { invoke } from "@tauri-apps/api";

export const useInvokeRenderEvent = () => {
  return (request: IVideoRenderRequest) => {
    const renderEvent = Boolean(request.subtitleFile)
      ? INVOKE_RENDER_EVENT
      : INVOKE_RENDER_EVENT_WITHOUT_SUBTITLES;
    invoke(renderEvent, {
      renderInfo: {
        input_video: request.inputVideo,
        subtitles_file: formatSubtitleFilePath(request.subtitleFile),
        output_video: generateVideoOutputPath(
          request.inputVideo,
          request.outputVideo,
        ),
      },
    });
  };
};
