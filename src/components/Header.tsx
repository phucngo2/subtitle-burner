import { Component } from "solid-js";

interface Props {
  title: string;
}

export const Header: Component<Props> = (props) => {
  return <h1 class="font-bold text-2xl">{props.title}</h1>;
};
