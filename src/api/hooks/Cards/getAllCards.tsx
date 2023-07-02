import { useQuery } from "@tanstack/react-query";
import { getCards } from "../../card-api";

export function _getAllCards() {
  return useQuery(["cards"], getCards, {
    onError: (err) => {
      console.error("ERROR at _getALLCards(): ", err);
    },
  });
}
