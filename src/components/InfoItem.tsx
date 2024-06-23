import { Component } from "solid-js";

interface Props {
  title: string;
  value: string | number;
}

export const InfoItem: Component<Props> = (props) => {
  return (
    <div class="flex items-center justify-between py-2 px-4 text-base font-bold rounded-lg w-full bg-slate-200">
      <div class="text-black">{props.title}</div>
      <div class="inline-flex items-center justify-center px-3 py-1 ml-3 text-sm font-medium text-white bg-gray-700 rounded">
        {props.value}
      </div>
    </div>
  );
};
