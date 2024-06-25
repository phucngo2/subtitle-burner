import { TagIcon } from "lucide-solid";
import { Component } from "solid-js";

export const FFmpegVersion: Component<{}> = () => {
  return (
    <label class="w-full form-control">
      {/* Top Label */}
      <div class="label">
        <span class="label-text">FFmpeg Version</span>
      </div>
      <div class="join">
        {/* Input Component with Icon */}
        <div class="join-item w-full input input-bordered cursor-pointer flex items-center gap-3">
          <TagIcon />
          <input
            type="text"
            class="w-full grow cursor-pointer"
            readonly
            placeholder="FFmpeg not found!"
          />
        </div>
        <button class="join-item btn btn-secondary">Download</button>
      </div>
    </label>
  );
};
