use ffmpeg_sidecar::command::FfmpegCommand;
use ffmpeg_sidecar::download::{auto_download_with_progress, FfmpegDownloadProgressEvent};
use ffmpeg_sidecar::version::ffmpeg_version;
use std::thread;
use std::fs::File;
use std::io::{Read, Write};
use std::path::Path;
use serde::Serialize;
use tauri::{AppHandle, Manager};

use crate::models::{render_info::RenderInfo, render_progress::RenderProgress};
use crate::utils::consts;

#[derive(Serialize, Clone)]
struct DownloadProgress {
    percent: u64,
    downloaded_mb: f64,
    total_mb: f64,
}

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

fn sidecar_download_ffmpeg_with_progress(app_handle: &AppHandle) -> Result<(), Box<dyn std::error::Error>> {
    auto_download_with_progress(|event| {
        let progress = match event {
            FfmpegDownloadProgressEvent::Starting => DownloadProgress {
                percent: 0,
                downloaded_mb: 0.0,
                total_mb: 0.0,
            },
            FfmpegDownloadProgressEvent::Downloading { downloaded_bytes, total_bytes } => {
                let percent = if total_bytes > 0 {
                    (downloaded_bytes as f64 / total_bytes as f64 * 99.0) as u64
                } else {
                    0
                };
                DownloadProgress {
                    percent,
                    downloaded_mb: (downloaded_bytes as f64) / 1_048_576.0,
                    total_mb: (total_bytes as f64) / 1_048_576.0,
                }
            }
            FfmpegDownloadProgressEvent::UnpackingArchive => DownloadProgress {
                percent: 99,
                downloaded_mb: 0.0,
                total_mb: 0.0,
            },
            FfmpegDownloadProgressEvent::Done => DownloadProgress {
                percent: 100,
                downloaded_mb: 0.0,
                total_mb: 0.0,
            },
        };

        app_handle
            .emit_to(consts::MAIN_WINDOW, consts::FFMPEG_DOWNLOAD_PROGRESS_EVENT, progress)
            .unwrap_or_else(|err| eprintln!("Failed to emit download progress event: {}", err));
    })?;

    Ok(())
}

#[allow(dead_code)]
fn download_ffmpeg_with_progress(app_handle: &AppHandle) -> Result<(), Box<dyn std::error::Error>> {
    let download_url = ffmpeg_sidecar::download::ffmpeg_download_url()?;
    let destination_dir = ffmpeg_sidecar::paths::sidecar_dir()?;

    std::fs::create_dir_all(&destination_dir)?;

    let filename = Path::new(download_url)
        .file_name()
        .ok_or_else(|| "Failed to get filename")?;
    let archive_path = destination_dir.join(filename);

    let client = reqwest::blocking::Client::builder()
        .build()?;
    let mut response = client.get(download_url)
        .send()
        .map_err(|e| format!("Request failed: {}", e))?;

    if !response.status().is_success() {
        return Err(format!("Request failed with status: {}", response.status()).into());
    }

    let total_size = response.content_length();

    let mut file = File::create(&archive_path)?;
    let mut buffer = [0; 65536];
    let mut downloaded: u64 = 0;
    let mut last_emitted_percent = 0;

    app_handle.emit_to(
        consts::MAIN_WINDOW,
        consts::FFMPEG_DOWNLOAD_PROGRESS_EVENT,
        0,
    ).ok();

    loop {
        let bytes_read = response.read(&mut buffer)?;
        if bytes_read == 0 {
            break;
        }
        file.write_all(&buffer[..bytes_read])?;
        downloaded += bytes_read as u64;

        if let Some(total) = total_size {
            if total > 0 {
                let percent = ((downloaded as f64 / total as f64) * 100.0) as u64;
                if percent > last_emitted_percent {
                    last_emitted_percent = percent;
                    app_handle.emit_to(
                        consts::MAIN_WINDOW,
                        consts::FFMPEG_DOWNLOAD_PROGRESS_EVENT,
                        percent,
                    ).ok();
                }
            }
        }
    }

    file.sync_all()?;

    ffmpeg_sidecar::download::unpack_ffmpeg(&archive_path, &destination_dir)?;

    Ok(())
}

#[tauri::command]
pub fn download_ffmpeg(app_handle: AppHandle) {
    println!("Download FFmpeg...");
    thread::spawn(move || match sidecar_download_ffmpeg_with_progress(&app_handle) {
        Ok(_) => {
            app_handle
                .emit_to(
                    consts::MAIN_WINDOW,
                    consts::FFMPEG_DOWNLOAD_SUCCESS_EVENT,
                    true,
                )
                .unwrap_or_else(|err| {
                    eprintln!("Failed to emit download success event: {}", err);
                });
        }
        Err(err) => {
            eprintln!("FFmpeg failed to install: {}", err);
            app_handle
                .emit_to(
                    consts::MAIN_WINDOW,
                    consts::FFMPEG_DOWNLOAD_FAILED_EVENT,
                    consts::FFMPEG_DOWNLOAD_FAILED_EVENT,
                )
                .unwrap_or_else(|err| {
                    eprintln!("Failed to emit download failed event: {}", err);
                });
        }
    });
}

#[tauri::command]
pub fn uninstall_ffmpeg(app_handle: AppHandle) {
    println!("Uninstall FFmpeg...");
    thread::spawn(move || {
        let result = ffmpeg_sidecar::paths::sidecar_dir()
            .map_err(|e| format!("Failed to locate sidecar dir: {}", e))
            .and_then(|dir| {
                // std::fs::remove_dir_all(&dir)
                //     .map_err(|e| format!("Failed to remove sidecar dir: {}", e))
                // Delete each known binary individually — remove_dir_all can fail
                // on Windows when executables were previously used by the OS.
                #[cfg(target_os = "windows")]
                let binaries = ["ffmpeg.exe", "ffprobe.exe", "ffplay.exe"];
                #[cfg(not(target_os = "windows"))]
                let binaries = ["ffmpeg", "ffprobe", "ffplay"];

                for binary in &binaries {
                    let path = dir.join(binary);
                    if path.exists() {
                        std::fs::remove_file(&path)
                            .map_err(|e| format!("Failed to remove {}: {}", binary, e))?;
                    }
                }

                // Best-effort: remove the directory if it's now empty
                let _ = std::fs::remove_dir(&dir);

                Ok(())
            });

        match result {
            Ok(_) => {
                app_handle
                    .emit_to(
                        consts::MAIN_WINDOW,
                        consts::FFMPEG_UNINSTALL_SUCCESS_EVENT,
                        true,
                    )
                    .unwrap_or_else(|err| {
                        eprintln!("Failed to emit uninstall success event: {}", err);
                    });
            }
            Err(err) => {
                eprintln!("FFmpeg failed to uninstall: {}", err);
                app_handle
                    .emit_to(
                        consts::MAIN_WINDOW,
                        consts::FFMPEG_UNINSTALL_FAILED_EVENT,
                        err,
                    )
                    .unwrap_or_else(|err| {
                        eprintln!("Failed to emit uninstall failed event: {}", err);
                    });
            }
        }
    });
}

