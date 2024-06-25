export interface IVideoRenderRequest {
  inputVideo: string;
  subtitleFile: string;
  outputVideo: string;
}

export interface IVideoRenderProgressInfo {
  bitrate_kbps: number;
  fps: number;
  frame: number;
  size_kb: number;
  speed: number;
  time: string;
}

export interface ISuccessState {
  outputFilePath: string;
}
