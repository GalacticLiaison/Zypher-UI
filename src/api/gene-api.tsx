import axios from "axios";
import { Gene } from "../services/gene-service";

const API_BASE_URL = "http://localhost:3000";
const env = "dev";

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

export const updateGene = (gene: Gene) =>
  axios
    .put(`${API_BASE_URL}/${env}/genes/${gene.id}`, gene)
    .then((response) => {
      console.log("UPDATE GENE", response);
      return response.data;
    });

export const deleteGene = (id: string) =>
  axios
    .delete(`${API_BASE_URL}/${env}/genes/${id}`)
    .then((response) => response.data);
