import { Routes } from "@/components/Router";
import { ScreenLoading } from "@/components/ScreenLoading";
import { useCheckFFmpegOnMount, useFFmpegDownloadResult } from "@/hooks";
import { Suspense } from "solid-js";
import "./App.css";

function App() {
  useCheckFFmpegOnMount();
  useFFmpegDownloadResult();

  return (
    <Suspense fallback={<ScreenLoading />}>
      <Routes />
    </Suspense>
  );
}

export default App;
