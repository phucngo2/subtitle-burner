import { RenderForm } from "@/components";
import { Component } from "solid-js";

const Home: Component<{}> = () => {
  return (
    <div class="flex flex-col items-center gap-6">
      <RenderForm />
    </div>
  );
};

export default Home;
