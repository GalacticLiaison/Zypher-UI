import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMutation } from "../../mutation-api";
import { optimisticallyUpdate } from "../_utils/hook-helpers";

export function _updateMutation() {
  const queryClient = useQueryClient();

  return useMutation(updateMutation, {
    onMutate: async (newMutation) => {
      return {
        previousMutations: optimisticallyUpdate(
          "Update",
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
