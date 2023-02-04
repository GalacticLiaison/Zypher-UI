import { useMutation } from "react-query";
import { saveImage } from "../image-api";

export function saveNewImage() {
  return useMutation(saveImage, {
    onError: (error) => {
      console.error(error);
    },
  });
}
