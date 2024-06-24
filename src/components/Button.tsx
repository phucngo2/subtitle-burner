import { Component, JSX, JSXElement } from "solid-js";

interface Props extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: JSXElement;
  classList?: {
    [k: string]: boolean | undefined;
  };
  Icon?: JSXElement;
}

export const Button: Component<Props> = (props) => {
  return (
    <button
      {...props}
      class="btn"
      classList={{
        ...props.classList,
      }}
    >
      {props.Icon}
      {props.children}
    </button>
  );
};
