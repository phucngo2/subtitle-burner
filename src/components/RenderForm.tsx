import { Button, FilePicker } from "@/components";
import {
  SUBTITLE_FILE_EXTENSIONS,
  VIDEO_FILE_EXTENSIONS,
} from "@/config/file-extensions.config";
import { useInvokeRenderEvent } from "@/events/use-invoke-render.event";
import { IVideoRenderRequest } from "@/types";
import { getFileValidator } from "@/utils";
import { createForm } from "@tanstack/solid-form";
import { Component, JSX } from "solid-js";

export const RenderForm: Component<{}> = () => {
  const invokeRenderEvent = useInvokeRenderEvent();

  const form = createForm<IVideoRenderRequest>(() => ({
    defaultValues: {
      inputVideo: "",
      subtitleFile: "",
      outputVideo: "",
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      invokeRenderEvent(value);
    },
  }));

  const handleSubmit: JSX.EventHandler<HTMLFormElement, SubmitEvent> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  // Render
  return (
    <form
      onSubmit={handleSubmit}
      class="flex flex-col gap-8 w-full items-center"
    >
      <form.Field
        name="inputVideo"
        validators={getFileValidator({
          fieldName: "Input Video",
          fileExtensions: VIDEO_FILE_EXTENSIONS,
        })}
      >
        {(field) => (
          <FilePicker
            label="Input Video"
            field={field}
            dialogOptions={{
              filters: [
                {
                  extensions: VIDEO_FILE_EXTENSIONS,
                  name: "*",
                },
              ],
            }}
            required
          />
        )}
      </form.Field>
      <form.Field
        name="subtitleFile"
        validators={getFileValidator({
          fieldName: "Subtitle File",
          fileExtensions: SUBTITLE_FILE_EXTENSIONS,
        })}
      >
        {(field) => (
          <FilePicker
            label="Subtitle File"
            field={field}
            dialogOptions={{
              filters: [
                {
                  extensions: SUBTITLE_FILE_EXTENSIONS,
                  name: "*",
                },
              ],
            }}
            required
          />
        )}
      </form.Field>
      <form.Field
        name="outputVideo"
        validators={getFileValidator({
          fieldName: "Output Folder",
        })}
      >
        {(field) => (
          <FilePicker
            label="Ouput Folder"
            field={field}
            dialogOptions={{
              directory: true,
            }}
            required
          />
        )}
      </form.Field>
      <div class="w-full flex flex-row items-center justify-center gap-4">
        <Button type="button">Clear All</Button>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};
