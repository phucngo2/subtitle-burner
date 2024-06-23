import { START_RENDER_EVENT } from "@/config/events.config";
import { IVideoRenderRequest } from "@/types";
import { formatSubtitleFilePath } from "@/utils";
import { invoke } from "@tauri-apps/api";

export const useInvokeRenderEvent = () => {
  return (request: IVideoRenderRequest) => {
    invoke(START_RENDER_EVENT, {
      renderInfo: {
        input_video: request.inputVideo,
        subtitles_file: formatSubtitleFilePath(request.subtitleFile),
        output_video: `${request.inputVideo}_muxed.mp4`,
      },
    });
  };
};
