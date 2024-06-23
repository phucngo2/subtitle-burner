import { Component, JSX, JSXElement } from "solid-js";

interface Props extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: JSXElement;
}

export const Button: Component<Props> = (props) => {
  return (
    <button
      {...props}
      class="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
    >
      {props.children}
    </button>
  );
};
