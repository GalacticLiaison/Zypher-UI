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
  subFolderName?: string;
}

export const saveImage = (image: Image): Promise<Gene[]> =>
  axios.post(`${API_BASE_URL}/${env}/image`, image).then((response) => {
    console.log("SAVE IMAGE: ", response);
    return response.data;
  });
