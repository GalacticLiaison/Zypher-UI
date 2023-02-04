import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGene } from "../../gene-api";
import { optimisticallyUpdate } from "../_utils/hook-helpers";

export function _saveNewGene() {
  const queryClient = useQueryClient();

  return useMutation(createGene, {
    onMutate: async (newGene) => {
      return {
        previousGenes: optimisticallyUpdate(
          "SaveNew",
          "genes",
          newGene,
          queryClient
        ),
      };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, newGene, context) => {
      if (context?.previousGenes)
        queryClient.setQueryData(["genes"], context.previousGenes);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["genes"] });
    },
  });
}
