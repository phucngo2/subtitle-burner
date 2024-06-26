use ffmpeg_sidecar::command::FfmpegCommand;
use ffmpeg_sidecar::download::auto_download;
use ffmpeg_sidecar::version::ffmpeg_version;
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

#[tauri::command]
pub fn get_ffmpeg_version() -> Option<String> {
    match ffmpeg_version() {
        Ok(version) => {
            println!("FFmpeg version: {}", version);
            version.into()
        }
        Err(_) => {
            println!("Failed to retrieve version.");
            None.into()
        }
    }
}

#[tauri::command]
pub fn download_ffmpeg(app_handle: AppHandle) {
    println!("Download FFmpeg...");
    thread::spawn(move || match auto_download() {
        Ok(_) => {
            app_handle
                .emit_to(
                    consts::MAIN_WINDOW,
                    consts::FFMPEG_DOWNLOAD_SUCCESS_EVENT,
                    consts::FFMPEG_DOWNLOAD_SUCCESS_EVENT,
                )
                .unwrap_or_else(|err| {
                    eprintln!("Failed to emit render success event: {}", err);
                });
        }
        Err(_) => {
            app_handle
                .emit_to(
                    consts::MAIN_WINDOW,
                    consts::FFMPEG_DOWNLOAD_FAILED_EVENT,
                    consts::FFMPEG_DOWNLOAD_FAILED_EVENT,
                )
                .unwrap_or_else(|err| {
                    eprintln!("Failed to emit render success event: {}", err);
                });
            println!("FFmpeg failed to install.");
        }
    });
}
