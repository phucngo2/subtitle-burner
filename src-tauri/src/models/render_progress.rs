use serde::Serialize;

#[derive(Serialize, Clone)]
pub struct RenderProgress {
    bitrate_kbps: f32,
    fps: f32,
    frame: u32,
    size_kb: u32,
    speed: f32,
    time: String,
}

impl RenderProgress {
    pub fn new(
        bitrate_kbps: f32,
        fps: f32,
        frame: u32,
        size_kb: u32,
        speed: f32,
        time: String,
    ) -> Self {
        Self {
            bitrate_kbps,
            fps,
            frame,
            size_kb,
            speed,
            time,
        }
    }
}
