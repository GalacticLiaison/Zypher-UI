import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMutation } from "../../mutation-api";
import { optimisticallyUpdate } from "../_utils/hook-helpers";

export function _saveNewMutation() {
  const queryClient = useQueryClient();

  return useMutation(createMutation, {
    onMutate: async (newMutation) => {
      return {
        previousMutations: optimisticallyUpdate(
          "SaveNew",
          "mutations",
          newMutation,
          queryClient
        ),
      };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, newMutation, context) => {
      if (context?.previousMutations)
        queryClient.setQueryData(["mutations"], context.previousMutations);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["mutations"] });
    },
  });
}
