import { Component, JSXElement } from "solid-js";

interface Props {
  children?: JSXElement;
}

const Layout: Component<Props> = (props) => {
  return (
    <div class="flex flex-col items-center">
      <div class="max-w-[600px] px-6 py-12">{props.children}</div>
    </div>
  );
};

export default Layout;
