import { useQuery } from "react-query";
import { getGenes } from "../gene-api";

export function getAllGenes() {
  return useQuery("genes", getGenes, {
    onError: (error) => {
      console.log("ERROR", error);
    },
  });
}
