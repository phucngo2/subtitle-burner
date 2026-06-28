use tauri::AppHandle;

#[tauri::command]
pub fn exit_app(app_handle: AppHandle) {
    app_handle.exit(0);
}

#[deprecated]
#[allow(dead_code)]
#[tauri::command]
pub fn restart_app(app_handle: AppHandle) {
    app_handle.restart();
}
