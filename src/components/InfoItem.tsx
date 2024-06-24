import { Component } from "solid-js";

interface Props {
  title: string;
  value: string | number;
}

export const InfoItem: Component<Props> = (props) => {
  return (
    <div class="card bg-neutral flex flex-row items-center justify-between py-3 px-6 text-base font-bold w-full">
      <div>{props.title}</div>
      <span class="badge px-5 py-3">{props.value}</span>
    </div>
  );
};
