import { useQuery } from "@tanstack/react-query";
import { getMutations } from "../../mutation-api";

export function _getAllMutations() {
  return useQuery(["mutations"], getMutations, {
    onError: (err) => {
      console.error("ERROR at _getALLGenes(): ", err);
    },
  });
}
