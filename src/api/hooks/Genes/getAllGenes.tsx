import { useQuery } from "@tanstack/react-query";
import { getGenes } from "../../gene-api";
import { QueryKeys } from "../_utils/hook-helpers";

export function _getAllGenes() {
  return useQuery(["genes"], getGenes, {
    onError: (err) => {
      console.error("ERROR at _getALLGenes(): ", err);
    },
  });
}
