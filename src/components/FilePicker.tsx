import { IVideoRenderRequest } from "@/types";
import { FieldApi } from "@tanstack/solid-form";
import { OpenDialogOptions, open } from "@tauri-apps/api/dialog";
import { Component, Show } from "solid-js";

interface Props {
  label: string;
  field: () => FieldApi<IVideoRenderRequest, any>;
  dialogOptions?: OpenDialogOptions;
  required?: boolean;
}

export const FilePicker: Component<Props> = (props) => {
  const handleOpenDialog = async () => {
    let result = await open(props.dialogOptions);
    props.field().handleChange(result);
  };
  return (
    <div class="w-full">
      <label
        class="block mb-2 text-sm font-medium text-white"
        for={props.field().name}
      >
        <Show when={props.required}>
          <span class="text-red-500">*</span>
        </Show>
        {props.label}
      </label>

      <input
        class="block w-full text-sm border rounded-lg cursor-pointer text-gray-400 focus:outline-none focus:ring-0 focus:ring-offset-0 bg-gray-700 border-gray-600 placeholder-gray-400"
        id={props.field().name}
        name={props.field().name}
        type="text"
        value={props.field().state.value}
        onClick={(e) => {
          e.preventDefault();
          handleOpenDialog();
        }}
        readonly
        placeholder="No file choosen"
      />

      <Show when={props.field().state.meta.touchedErrors}>
        <div class="text-red-500">{props.field().state.meta.touchedErrors}</div>
      </Show>
    </div>
  );
};
