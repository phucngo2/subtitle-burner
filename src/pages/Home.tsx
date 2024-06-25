import { Header, RenderForm } from "@/components";
import { SETTINGS_PATH } from "@/config/routes.config";
import { useNavigate } from "@solidjs/router";
import { CogIcon } from "lucide-solid";
import { Component } from "solid-js";

const Home: Component<{}> = () => {
  const navigate = useNavigate();
  const navigateToSetting = () => {
    navigate(SETTINGS_PATH);
  };

  return (
    <div class="flex flex-col items-center gap-8 justify-between h-full w-full">
      <div class="flex flex-col items-center gap-8 justify-between w-full">
        <Header title="🔥 Subtitle Burner 🔥" />
        <RenderForm />
      </div>
      <div class="flex flex-row items-center w-full">
        <button class="btn btn-accent" onClick={navigateToSetting}>
          <CogIcon />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Home;
