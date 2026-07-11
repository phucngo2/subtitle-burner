import { IVideoRenderRequest } from "@/types";
import { FieldValidators } from "@tanstack/solid-form";

export const isFileExtensionInvalid = (
  filePath: string,
  fileExtensions: string[],
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
  isRequired = true,
}: {
  fieldName: string;
  fileExtensions?: string[];
  isRequired?: boolean;
}): FieldValidators<IVideoRenderRequest, any> => ({
  onChange: ({ value }) => {
    if (!value && isRequired) {
      return `The '${fieldName}' field is required!`;
    }
    if (
      value &&
      fileExtensions &&
      isFileExtensionInvalid(value, fileExtensions)
    ) {
      return `File extension must be either: ${fileExtensions.join(", ")}!`;
    }
    return undefined;
  },
});
