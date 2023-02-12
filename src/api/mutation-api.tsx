import axios from "axios";
import { Mutation } from "../services/mutation-service";

const API_BASE_URL = "http://localhost:3000";
const env = "dev";

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

export const updateMutation = (mutation: Mutation) =>
  axios
    .put(`${API_BASE_URL}/${env}/mutations/${mutation.id}`, mutation)
    .then((response) => {
      console.log("UPDATE MUTATION", response);
      return response.data;
    });

export const deleteMutation = (id: string) =>
  axios
    .delete(`${API_BASE_URL}/${env}/mutations/${id}`)
    .then((response) => response.data);
