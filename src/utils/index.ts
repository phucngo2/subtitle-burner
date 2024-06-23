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
