import { INVOKE_RENDER_EVENT } from "@/config/events.config";
import { IVideoRenderRequest } from "@/types";
import { formatSubtitleFilePath, generateVideoOutputPath } from "@/utils";
import { invoke } from "@tauri-apps/api";

export const useInvokeRenderEvent = () => {
  return (request: IVideoRenderRequest) => {
    invoke(INVOKE_RENDER_EVENT, {
      renderInfo: {
        input_video: request.inputVideo,
        subtitles_file: formatSubtitleFilePath(request.subtitleFile),
        output_video: generateVideoOutputPath(request.inputVideo),
      },
    });
  };
};
