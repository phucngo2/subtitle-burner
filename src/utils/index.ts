import { IVideoRenderRequest } from "@/types";
import { FieldValidators } from "@tanstack/solid-form";

export const isFileExtensionInvalid = (
  filePath: string,
  fileExtensions: string[]
) => {
  var fileExtension = filePath.split(".").pop();
  if (fileExtension && fileExtensions.includes(fileExtension)) {
    return false;
  }
  return true;
};

export const getFileValidator = ({
  fieldName,
  fileExtensions,
}: {
  fieldName: string;
  fileExtensions?: string[];
}): FieldValidators<IVideoRenderRequest, any> => ({
  onChange: ({ value }) => {
    if (!value) return `An ${fieldName} is required!`;
    if (fileExtensions && isFileExtensionInvalid(value, fileExtensions))
      return `File extension must be either: ${fileExtensions.join(", ")}!`;
    return undefined;
  },
});

export const formatSubtitleFilePath = (subtitleFilePath: string) => {
  // Example subtitle path: E\\:\\\\test.srt
  return subtitleFilePath.replace(/\\/g, "\\\\").replace(/:/g, "\\:");
};

/**
 * Format bytes as human-readable text.
 *
 * @param bytes Number of bytes.
 * @param si True to use metric (SI) units, aka powers of 1000. False to use
 *           binary (IEC), aka powers of 1024.
 * @param dp Number of decimal places to display.
 *
 * @return Formatted string.
 *
 * https://stackoverflow.com/questions/10420352/converting-file-size-in-bytes-to-human-readable-string
 */
export function humanFileSize(bytes: number, si = false, dp = 1) {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + " B";
  }

  const units = si
    ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (
    Math.round(Math.abs(bytes) * r) / r >= thresh &&
    u < units.length - 1
  );

  return bytes.toFixed(dp) + " " + units[u];
}
