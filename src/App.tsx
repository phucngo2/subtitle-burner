import { Routes } from "@/components/Router";
import { Suspense, onMount } from "solid-js";
import "./App.css";
import { ScreenLoading } from "./components/ScreenLoading";
import { useInvokeFFmpegVersionEvent } from "./events/use-invoke-ffmpeg-version.event";
import { setffmpegVersion } from "./signals/ffmpeg-info.signal";

function App() {
  const invokeFFmpegVersionEvent = useInvokeFFmpegVersionEvent();
  onMount(() => {
    invokeFFmpegVersionEvent().then((value) => {
      if (value) {
        setffmpegVersion(value as string);
      }
    });
  });
  return (
    <Suspense fallback={<ScreenLoading />}>
      <Routes />
    </Suspense>
  );
}

export default App;
