import axios from "axios";
import { Mutation } from "../services/mutation-service";

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

export const getMutations = (): Promise<Mutation[]> =>
  axios.get(`${API_BASE_URL}/${env}/mutations`).then((response) => {
    console.log("GET MUTATIONS", response);
    return response.data;
  });

export const createMutation = (mutation: Mutation): Promise<Mutation[]> =>
  axios.post(`${API_BASE_URL}/${env}/mutations`, mutation).then((response) => {
    console.log("CREATE MUTATION", response);
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

export const updateMutation = (mutation: Mutation) =>
  axios
    .put(`${API_BASE_URL}/${env}/mutations/${mutation.id}`, mutation)
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

export const deleteMutation = (id: string) =>
  axios
    .delete(`${API_BASE_URL}/${env}/mutations/${id}`)
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
