import { Header, RenderProgressInfo } from "@/components";
import { ERROR_PATH, SUCCESS_PATH } from "@/config/routes.config";
import { useListenRenderResult } from "@/events/use-listen-render-result.event";
import { useNavigate } from "@solidjs/router";
import { Component } from "solid-js";

const RenderProgress: Component<{}> = () => {
  const navigate = useNavigate();

  useListenRenderResult({
    onSuccess(event) {
      navigate(SUCCESS_PATH, {
        state: {
          outputFilePath: event.payload,
        },
      });
    },
    onError(_) {
      navigate(ERROR_PATH);
    },
  });

  return (
    <div class="flex flex-col items-center gap-8">
      <Header title="Rendering..." />
      <progress class="progress progress-primary w-full"></progress>
      <RenderProgressInfo />
    </div>
  );
};

export default RenderProgress;
