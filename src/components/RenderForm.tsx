import { Button, FilePicker } from "@/components";
import {
  SUBTITLE_FILE_EXTENSIONS,
  VIDEO_FILE_EXTENSIONS,
} from "@/config/file-extensions.config";
import { RENDERING_PATH } from "@/config/routes.config";
import { useInvokeRenderEvent } from "@/events/use-invoke-render.event";
import { ffmpegVersion } from "@/signals/ffmpeg-info.signal";
import { IVideoRenderRequest } from "@/types";
import { getFileValidator } from "@/utils";
import { useNavigate } from "@solidjs/router";
import { createForm } from "@tanstack/solid-form";
import {
  FileTextIcon,
  PaintbrushIcon,
  RocketIcon,
  VideoIcon,
} from "lucide-solid";
import { Component, JSX } from "solid-js";

export const RenderForm: Component<{}> = () => {
  const invokeRenderEvent = useInvokeRenderEvent();
  const navigate = useNavigate();

  const form = createForm<IVideoRenderRequest>(() => ({
    defaultValues: {
      inputVideo: "",
      subtitleFile: "",
      outputVideo: "",
    },
    onSubmit: async ({ value }) => {
      invokeRenderEvent(value);
      navigate(RENDERING_PATH);
    },
  }));

  const handleClearAll = () => {
    form.reset();
  };

  const handleSubmit: JSX.EventHandler<HTMLFormElement, SubmitEvent> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  // Render
  return (
    <form
      onSubmit={handleSubmit}
      class="card bg-neutral flex flex-col w-full gap-0.5 items-center p-8"
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
            required
            allowedExtensions={VIDEO_FILE_EXTENSIONS}
            Icon={<VideoIcon />}
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
            required
            allowedExtensions={SUBTITLE_FILE_EXTENSIONS}
            Icon={<FileTextIcon />}
          />
        )}
      </form.Field>
      <div class="w-full flex flex-row items-center justify-center gap-4 mt-3.5">
        <Button
          type="button"
          onClick={handleClearAll}
          Icon={<PaintbrushIcon />}
        >
          Clear All
        </Button>
        <Button
          type="submit"
          classList={{
            "btn-primary": true,
          }}
          Icon={<RocketIcon />}
          disabled={!ffmpegVersion()}
        >
          Submit
        </Button>
      </div>
    </form>
  );
};
