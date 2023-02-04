import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateGene } from "../../gene-api";
import { optimisticallyUpdate } from "../_utils/hook-helpers";

export function _updateGene() {
  const queryClient = useQueryClient();

  return useMutation(updateGene, {
    onMutate: async (newGene) => {
      return {
        previousGenes: optimisticallyUpdate(
          "Update",
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
