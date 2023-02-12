import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPerk } from "../../perk-api";
import { optimisticallyUpdate } from "../_utils/hook-helpers";

export function _saveNewPerk() {
  const queryClient = useQueryClient();

  return useMutation(createPerk, {
    onMutate: async (newPerk) => {
      return {
        previousPerks: optimisticallyUpdate(
          "SaveNew",
          "perks",
          newPerk,
          queryClient
        ),
      };
    },
    // If the perk fails,
    // use the context returned from onMutate to roll back
    onError: (err, newPerk, context) => {
      if (context?.previousPerks)
        queryClient.setQueryData(["perks"], context.previousPerks);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["perks"] });
    },
  });
}
