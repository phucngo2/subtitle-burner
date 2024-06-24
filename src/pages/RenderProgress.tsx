import { Header, RenderProgressInfo } from "@/components";
import { Component } from "solid-js";

const RenderProgress: Component<{}> = () => {
  return (
    <div class="flex flex-col items-center gap-8">
      <Header title="Rendering..." />
      <progress class="progress progress-primary w-full"></progress>
      <RenderProgressInfo />
    </div>
  );
};

export default RenderProgress;
