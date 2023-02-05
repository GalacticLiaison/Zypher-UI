import axios from "axios";
import { Gene } from "../services/gene-service";

const API_BASE_URL = "http://localhost:3000";
const env = "dev";

// export const getItems = () => {
//   return axios
//     .get(`${API_BASE_URL}/${env}/items`)
//     .then((response) => response.data)
//     .catch((error) => {
//       console.error(error);
//       throw error;
//     });
// };

export interface Image {
  name: string;
  data: any;
  subFolderName: string;
}

export const saveImage = (image: FormData): Promise<void> =>
  axios
    .post(`${API_BASE_URL}/${env}/images`, image, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log("SAVE IMAGE: ", response);
      return response.data;
    });
