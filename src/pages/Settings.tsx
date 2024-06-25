import { Header } from "@/components";
import { ThemeController } from "@/components/ThemeController";
import { HOME_PATH } from "@/config/routes.config";
import { useNavigate } from "@solidjs/router";
import { HomeIcon } from "lucide-solid";
import { Component, createSignal, onMount } from "solid-js";
import { getVersion } from "@tauri-apps/api/app";
import { FFmpegVersion } from "@/components/FFmpegVersion";

const Settings: Component<{}> = () => {
  const navigate = useNavigate();
  const handleBackToHome = () => {
    navigate(HOME_PATH);
  };

  const [appVersion, setAppVersion] = createSignal("");
  onMount(() => {
    getVersion().then(setAppVersion);
  });

  return (
    <div class="flex flex-col items-center gap-8 justify-between w-full h-full">
      <Header title="⚙️ Settings ⚙️" />
      <div class="indicator w-full">
        <div class="card bg-neutral flex flex-col w-full gap-5 p-8 pb-16">
          <ThemeController />
          <FFmpegVersion />
        </div>
        <div class="indicator-item indicator-bottom indicator-center w-full flex justify-center">
          <button class="btn" onClick={handleBackToHome}>
            <HomeIcon />
            <span>Back to Home</span>
          </button>
        </div>
      </div>
      <div class="mt-auto">v{appVersion()}</div>
    </div>
  );
};

export default Settings;
