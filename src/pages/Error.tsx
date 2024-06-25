import { Header } from "@/components";
import { HOME_PATH } from "@/config/routes.config";
import { useNavigate } from "@solidjs/router";
import { CircleXIcon, HomeIcon } from "lucide-solid";
import { Component } from "solid-js";

const Error: Component<{}> = () => {
  const navigate = useNavigate();
  const handleBackToHome = () => {
    navigate(HOME_PATH);
  };

  return (
    <div class="flex flex-col items-center gap-8">
      <Header title="😥 Oops... 🍌" />
      <div class="indicator w-full">
        <div class="text-error flex flex-col items-center gap-4 card bg-neutral p-6 pb-12 w-full">
          <CircleXIcon size={48} strokeWidth={2} />
          <Header title="Failed!" />
        </div>
        <div class="indicator-item indicator-bottom indicator-center w-full flex justify-center">
          <button class="btn" onClick={handleBackToHome}>
            <HomeIcon />
            <span>Back to Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;
