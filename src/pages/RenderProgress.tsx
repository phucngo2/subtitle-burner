import { Header, RenderProgressInfo } from "@/components";
import { Component } from "solid-js";

const RenderProgress: Component<{}> = () => {
  return (
    <div class="flex flex-col items-center gap-12">
      <Header title="Rendering..." />
      <RenderProgressInfo />
    </div>
  );
};

export default RenderProgress;
