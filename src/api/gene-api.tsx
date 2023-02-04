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

export const getGenes = (): Promise<Gene[]> =>
  axios.get(`${API_BASE_URL}/${env}/genes`).then((response) => {
    console.log("GET GENES", response);
    return response.data;
  });

export const createGene = (gene: Gene): Promise<Gene[]> =>
  axios.post(`${API_BASE_URL}/${env}/genes`, gene).then((response) => {
    console.log("CREATE GENE", response);
    return response.data;
  });

// export const createItem = (item: any) => {
//   return axios
//     .post(`${API_BASE_URL}/${env}/items`, item)
//     .then((response) => response.data)
//     .catch((error) => {
//       console.error(error);
//       throw error;
//     });
// };

export const updateGene = (id: string, gene: Gene) =>
  axios
    .put(`${API_BASE_URL}/${env}/genes/${id}`, gene)
    .then((response) => response.data);

// export const updateItem = (id: string, item: any) => {
//   return axios
//     .put(`${API_BASE_URL}/${env}/items/${id}`, item)
//     .then((response) => response.data)
//     .catch((error) => {
//       console.error(error);
//       throw error;
//     });
// };

export const deleteGene = (id: string) =>
  axios
    .delete(`${API_BASE_URL}/${env}/genes/${id}`)
    .then((response) => response.data);

// export const deleteItem = (id: string) => {
//   return axios
//     .delete(`${API_BASE_URL}/${env}/items/${id}`)
//     .then((response) => response.data)
//     .catch((error) => {
//       console.error(error);
//       throw error;
//     });
// };
