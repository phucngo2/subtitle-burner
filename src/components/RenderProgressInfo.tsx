import { Component } from "solid-js";
import { InfoItem } from "./InfoItem";
import { useListenRenderingEvent } from "@/events/use-listen-rendering-progress.event";
import { createStore } from "solid-js/store";
import { IVideoRenderProgressInfo } from "@/types";
import { humanFileSize } from "@/utils";

export const RenderProgressInfo: Component<{}> = () => {
  const [store, setStore] =
    createStore<IVideoRenderProgressInfo>(storeInitialValue);

  useListenRenderingEvent((event) => {
    setStore(event.payload as IVideoRenderProgressInfo);
  });

  return (
    <div class="flex flex-col w-full items-center gap-3.5">
      <InfoItem title="FPS" value={store.fps} />
      <InfoItem title="Speed" value={store.speed.toLocaleString()} />
      <InfoItem
        title="BitRate"
        value={`${store.bitrate_kbps.toLocaleString()} kbps`}
      />
      <InfoItem
        title="Size"
        value={humanFileSize(store.size_kb * 1000, true)}
      />
      <InfoItem title="Frame" value={store.frame.toLocaleString()} />
      <InfoItem title="Time" value={store.time} />
    </div>
  );
};

const storeInitialValue = {
  bitrate_kbps: 0,
  fps: 0,
  frame: 0,
  size_kb: 0,
  speed: 0,
  time: "Processing...",
};
