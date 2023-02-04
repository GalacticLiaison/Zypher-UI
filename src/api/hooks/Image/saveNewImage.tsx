import { useMutation } from "@tanstack/react-query";
import { saveImage } from "../../image-api";

export function _saveNewImage() {
  return useMutation(saveImage, {
    onError: (err) => {
      console.error("ERROR at _saveNewImage(): ", err);
    },
    onSettled: () => {
      console.log("Image Saved");
    },
  });
}
