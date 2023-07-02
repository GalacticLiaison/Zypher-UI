import axios from "axios";
import { CombatCard } from "../features/Combat/CombatCards/CombatCard";

const API_BASE_URL = "http://localhost:3000";
const env = "dev";

export const getCards = (): Promise<CombatCard[]> =>
  axios.get(`${API_BASE_URL}/${env}/cards`).then((response) => {
    console.log("GET CARDS", response);
    return response.data;
  });

export const createCard = (card: CombatCard): Promise<CombatCard[]> =>
  axios.post(`${API_BASE_URL}/${env}/cards`, card).then((response) => {
    console.log("CREATE CARD", response);
    return response.data;
  });

export const updateCard = (card: CombatCard) =>
  axios
    .put(`${API_BASE_URL}/${env}/cards/${card.id}`, card)
    .then((response) => {
      console.log("UPDATE CARD", response);
      return response.data;
    });

export const deleteCard = (id: string) =>
  axios
    .delete(`${API_BASE_URL}/${env}/cards/${id}`)
    .then((response) => response.data);
