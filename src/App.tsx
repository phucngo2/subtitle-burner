import { Routes } from "@/components/Router";
import "./App.css";
import { Suspense } from "solid-js";
import { ScreenLoading } from "./components/ScreenLoading";

function App() {
  return (
    <Suspense fallback={<ScreenLoading />}>
      <Routes />
    </Suspense>
  );
}

export default App;
