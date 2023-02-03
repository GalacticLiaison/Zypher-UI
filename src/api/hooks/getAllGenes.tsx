import { useQuery, QueryCache } from "react-query";
import { createGene, getGenes } from "../gene-api";

export function getAllGenes() {
  return useQuery("genes", getGenes, {
    onError: (error) => {
      console.log("ERROR", error);
    },
  });
}
