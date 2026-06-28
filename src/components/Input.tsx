import { IVideoRenderRequest } from "@/types";
import { FieldApi } from "@tanstack/solid-form";
import { Component, JSXElement, Show } from "solid-js";

interface Props {
  label: string;
  field: () => FieldApi<IVideoRenderRequest, any>;
  allowedExtensions?: string[];
  required?: boolean;
  Icon?: JSXElement;
  placeholder?: string;
  badge?: string;
}

export const Input: Component<Props> = (props) => {
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
        <Show when={props.allowedExtensions}>
          <span class="label-text-alt">
            ({props.allowedExtensions?.join(", ")})
          </span>
        </Show>
      </div>

      {/* Input Component with Icon */}
      <div class="input input-bordered flex items-center gap-3">
        <span>{props.Icon}</span>
        <input
          type="text"
          class="w-full grow"
          value={props.field().state.value}
          placeholder={props.placeholder ?? `Enter ${props.label}`}
          name={props.field().name}
          onInput={(e) => props.field().handleChange(e.currentTarget.value)}
          onBlur={() => props.field().handleBlur()}
        />
        <Show when={props.badge}>
          <span class="badge badge-neutral">{props.badge}</span>
        </Show>
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
