import { Header, RenderProgressInfo } from "@/components";
import { useListenRenderResult } from "@/events/use-listen-render-result.event";
import { Component } from "solid-js";

const RenderProgress: Component<{}> = () => {
  useListenRenderResult({
    onSuccess(event) {
      console.log(event);
    },
    onError(event) {
      console.log(event);
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
