import { useQuery } from "@tanstack/react-query";
import { getPerks } from "../../perk-api";

export function _getAllPerks() {
  return useQuery(["perks"], getPerks, {
    onError: (err) => {
      console.error("ERROR at _getALLGenes(): ", err);
    },
  });
}
