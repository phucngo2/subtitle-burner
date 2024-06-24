import { Component, JSXElement } from "solid-js";

interface Props {
  children?: JSXElement;
}

const Layout: Component<Props> = (props) => {
  return (
    <div class="w-screen flex flex-col items-center">
      <div class="app-layout p-8">{props.children}</div>
    </div>
  );
};

export default Layout;
