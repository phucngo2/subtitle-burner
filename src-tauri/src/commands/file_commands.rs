use tauri::{api::shell::open, AppHandle, Manager};

#[tauri::command]
pub fn open_file(file_path: String, app_handle: AppHandle) -> Result<(), String> {
    if let Err(e) = open(&app_handle.shell_scope(), file_path, None) {
        return Err(format!("Failed to open file: {}", e));
    }
    Ok(())
}
