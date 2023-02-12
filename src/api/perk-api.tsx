import axios from "axios";
import { Perk } from "../services/character-service/Character";

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

export const getPerks = (): Promise<Perk[]> =>
  axios.get(`${API_BASE_URL}/${env}/perks`).then((response) => {
    console.log("GET PERKS", response);
    return response.data;
  });

export const createPerk = (perk: Perk): Promise<Perk[]> =>
  axios.post(`${API_BASE_URL}/${env}/perks`, perk).then((response) => {
    console.log("CREATE PERK", response);
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

export const updatePerk = (perk: Perk) =>
  axios
    .put(`${API_BASE_URL}/${env}/perks/${perk.id}`, perk)
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

export const deletePerk = (id: string) =>
  axios
    .delete(`${API_BASE_URL}/${env}/perks/${id}`)
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
