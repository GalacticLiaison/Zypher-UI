import axios from "axios";

const API_BASE_URL = "http://localhost:3000";
const env = "dev";

export interface Image {
  name: string;
  data: any;
  subFolderName: string;
}

export const saveImage = (image: string): Promise<void> =>
  axios
    .post(`${API_BASE_URL}/${env}/images`, image, {
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // },
    })
    .then((response) => {
      console.log("SAVE IMAGE: ", response);
      return response.data;
    });
