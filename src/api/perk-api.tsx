import axios from "axios";
import { Perk } from "../services/character-service/Character";

const API_BASE_URL = "http://localhost:3000";
const env = "dev";

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

export const updatePerk = (perk: Perk) =>
  axios
    .put(`${API_BASE_URL}/${env}/perks/${perk.id}`, perk)
    .then((response) => {
      console.log("UPDATE PERK", response);
      return response.data;
    });

export const deletePerk = (id: string) =>
  axios
    .delete(`${API_BASE_URL}/${env}/perks/${id}`)
    .then((response) => response.data);
