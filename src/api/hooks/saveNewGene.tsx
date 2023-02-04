import { QueryClient, useMutation } from "react-query";
import { Gene } from "../../services/gene-service";
import { createGene } from "../gene-api";

export function saveNewGene() {
  const queryClient = new QueryClient();
  return useMutation(createGene, {
    onMutate: async (newGene) => {
      console.log("MUTATE: ", newGene);
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries("genes");

      // Snapshot the previous value
      const previousGenes = queryClient.getQueryData<Gene[]>("genes");

      // optimistically add new gene to cache
      if (previousGenes) {
        queryClient.setQueryData<Gene[]>("genes", previousGenes);
      }

      // return rollback function
      return { previousGenes };
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, variables, context) => {
      if (context?.previousGenes) {
        queryClient.setQueryData<Gene[]>("genes", context.previousGenes);
      }
    },
    onSettled: () => {
      console.log("SETTLED");
      queryClient.invalidateQueries("genes");
    },
  });
}
