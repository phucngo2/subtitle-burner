use ffmpeg_sidecar::command::FfmpegCommand;
use std::thread;
use tauri::{AppHandle, Manager};

use crate::models::{render_info::RenderInfo, render_progress::RenderProgress};
use crate::utils::consts;

#[tauri::command]
pub fn render(render_info: RenderInfo, app_handle: AppHandle) {
    thread::spawn(move || {
        let result: Result<(), std::io::Error> = FfmpegCommand::new()
            .args([
                "-y",
                "-i",
                &render_info.input_video,
                "-vf",
                &format!("subtitles='{}'", &render_info.subtitles_file),
                &render_info.output_video,
            ])
            .spawn()
            .unwrap()
            .iter()
            .unwrap()
            .filter_progress()
            .map(|progress: ffmpeg_sidecar::event::FfmpegProgress| {
                RenderProgress::new(
                    progress.bitrate_kbps,
                    progress.fps,
                    progress.frame,
                    progress.size_kb,
                    progress.speed,
                    progress.time,
                )
            })
            .try_for_each(|progress: RenderProgress| {
                app_handle
                    .emit_to(consts::MAIN_WINDOW, consts::RENDERING_EVENT, progress)
                    .map_err(|err: tauri::Error| {
                        eprintln!("Error emitting rendering event: {}", err);
                        // Return an error to stop iteration
                        std::io::Error::new(std::io::ErrorKind::Other, "Event emission error")
                    })
            });

        // Handle errors from rendering or event emission
        if let Err(err) = result {
            eprintln!("Error during rendering: {}", err);
            // Emit a failure event to the frontend
            app_handle
                .emit_to(
                    consts::MAIN_WINDOW,
                    consts::RENDERING_ERROR_EVENT,
                    "Render Failed!",
                )
                .unwrap_or_else(|err| {
                    eprintln!("Failed to emit render failure event: {}", err);
                });
        } else {
            // Emit a success event to the frontend
            app_handle
                .emit_to(
                    consts::MAIN_WINDOW,
                    consts::RENDER_SUCCESS_EVENT,
                    render_info.output_video,
                )
                .unwrap_or_else(|err| {
                    eprintln!("Failed to emit render success event: {}", err);
                });
        }
    });
}
