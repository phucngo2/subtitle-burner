import { Header, RenderForm } from "@/components";
import { Component } from "solid-js";

const Home: Component<{}> = () => {
  return (
    <div class="flex flex-col items-center gap-16">
      <Header title="Subtitle Burner" />
      <RenderForm />
    </div>
  );
};

export default Home;
