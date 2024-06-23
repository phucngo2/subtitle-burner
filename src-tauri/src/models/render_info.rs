use serde::Deserialize;

#[derive(Debug, Deserialize)]
pub struct RenderInfo {
    pub input_video: String,
    pub subtitles_file: String,
    pub output_video: String,
}
