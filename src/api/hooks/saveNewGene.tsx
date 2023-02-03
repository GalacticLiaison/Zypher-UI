import { useQuery, QueryClient, useMutation } from "react-query";
import { createGene, getGenes } from "../gene-api";

export function saveNewGene() {
  const queryClient = new QueryClient();
  return useMutation(createGene, {
    onMutate: (newGene) => {
      // take snapshot of old genes
      const oldGenes = queryClient.getQueryData("genes");

      // optimistically add new gene to cache
      if (queryClient.getQueryData("genes")) {
        queryClient.setQueryData("genes", (old: any) => [...old, newGene]);
      }

      // return rollback function
      return () => queryClient.setQueryData("genes", oldGenes);
    },
    onError: (error, _newGene, rollback) => {
      // value of "rollback" is the return value of onMutate
      console.error(error);
      // notice rollback is passed as a function above so we can just execute it here.
      if (rollback) rollback();
    },
    onSettled: () => {
      queryClient.invalidateQueries("genes");
    },
  });
}
