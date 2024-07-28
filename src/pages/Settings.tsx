import { Header } from "@/components";
import { FFmpegMessage } from "@/components/FFmpegMessage";
import { FFmpegVersion } from "@/components/FFmpegVersion";
import { ThemeController } from "@/components/ThemeController";
import { HOME_PATH } from "@/config/routes.config";
import { useNavigate } from "@solidjs/router";
import { getVersion } from "@tauri-apps/api/app";
import { HomeIcon } from "lucide-solid";
import { Component, createSignal, onMount } from "solid-js";

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
      <div class="flex flex-col items-center gap-8 justify-between w-full">
        <Header title="⚙️ Settings ⚙️" />
        <div class="card bg-neutral flex flex-col w-full gap-5 p-8">
          <ThemeController />
          <FFmpegVersion />
          <div class="flex w-full items-center justify-center mt-8">
            v{appVersion()}
          </div>
        </div>
      </div>
      <div class="flex flex-row items-center w-full">
        <FFmpegMessage>
          <button class="btn btn-secondary" onClick={handleBackToHome}>
            <HomeIcon />
            <span>Home</span>
          </button>
        </FFmpegMessage>
      </div>
    </div>
  );
};

export default Settings;
