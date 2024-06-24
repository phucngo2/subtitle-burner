import { IVideoRenderRequest } from "@/types";
import { FieldApi } from "@tanstack/solid-form";
import { open } from "@tauri-apps/api/dialog";
import { Component, JSXElement, Show } from "solid-js";

interface Props {
  label: string;
  field: () => FieldApi<IVideoRenderRequest, any>;
  allowedExtensions?: string[];
  required?: boolean;
  Icon?: JSXElement;
}

export const FilePicker: Component<Props> = (props) => {
  const handleOpenDialog = async () => {
    let dialogOptions = props.allowedExtensions
      ? {
          filters: [
            {
              extensions: props.allowedExtensions,
              name: "*",
            },
          ],
        }
      : undefined;
    let result = await open(dialogOptions);
    props.field().handleChange(result);
  };

  return (
    <label class="w-full form-control">
      {/* Top Label */}
      <div class="label">
        <span class="label-text">
          <Show when={props.required}>
            <span class="text-red-500">* </span>
          </Show>
          {props.label}
        </span>
        <span class="label-text-alt">
          ({props.allowedExtensions?.join(", ")})
        </span>
      </div>

      {/* Input Component with Icon */}
      <div class="input input-bordered cursor-pointer flex items-center gap-3">
        {props.Icon}
        <input
          type="text"
          class="w-full grow cursor-pointer"
          value={props.field().state.value}
          onClick={(e) => {
            e.preventDefault();
            handleOpenDialog();
          }}
          readonly
          placeholder="No file choosen"
        />
      </div>

      {/* Bottom Label - Validation message */}
      <Show when={props.field().state.meta.touchedErrors}>
        <div class="label">
          <span class="label-text-alt text-red-500">
            {props.field().state.meta.touchedErrors}
          </span>
        </div>
      </Show>
    </label>
  );
};
