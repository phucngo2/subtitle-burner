import {
  ERROR_PATH,
  HOME_PATH,
  RENDERING_PATH,
  SETTINGS_PATH,
  SUCCESS_PATH,
} from "@/config/routes.config";
import { Navigate, Route, Router } from "@solidjs/router";
import { Component, lazy } from "solid-js";
import Layout from "./Layout";

const Home = lazy(() => import("@/pages/Home"));
const RenderProgress = lazy(() => import("@/pages/RenderProgress"));
const Settings = lazy(() => import("@/pages/Settings"));
const Success = lazy(() => import("@/pages/Success"));
const Error = lazy(() => import("@/pages/Error"));

export const Routes: Component<{}> = () => {
  return (
    <Router root={Layout}>
      <Route path={HOME_PATH} component={Home} />
      <Route path={SETTINGS_PATH} component={Settings} />
      <Route path={RENDERING_PATH} component={RenderProgress} />
      <Route path={SUCCESS_PATH} component={Success} />
      <Route path={ERROR_PATH} component={Error} />
      <Route path="*404" component={NavigateToHome} />
    </Router>
  );
};

function NavigateToHome() {
  return <Navigate href="/" />;
}
