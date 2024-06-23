import { Component, JSXElement } from "solid-js";

interface Props {
  children?: JSXElement;
}

const Layout: Component<Props> = (props) => {
  return (
    <div class="w-screen flex flex-col items-center">
      <div class="app-layout py-6 px-12">{props.children}</div>
    </div>
  );
};

export default Layout;
