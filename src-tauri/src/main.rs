// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

pub mod models;
pub mod utils;

use ffmpeg_sidecar::command::FfmpegCommand;
use std::thread;
use tauri::{AppHandle, Manager};

use models::{render_info::RenderInfo, render_progress::RenderProgress};
use utils::consts;

#[tauri::command]
fn render(render_info: RenderInfo, app_handle: AppHandle) {
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
            .map(|progress| {
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
                    .emit_all(consts::RENDERING_EVENT, progress)
                    .map_err(|err: tauri::Error| {
                        eprintln!("Error emitting rendering event: {}", err);
                        // Return an error to stop iteration
                        std::io::Error::new(std::io::ErrorKind::Other, "Event emission error")
                    })
            });

        // Handle errors from rendering event emission
        if let Err(err) = result {
            eprintln!("Error during rendering: {}", err);
            // Handle the error as needed (log, notify user, etc.)
        }
    });
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![render])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
