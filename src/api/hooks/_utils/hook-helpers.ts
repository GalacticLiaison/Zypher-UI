import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { Gene } from "../../../services/gene-service";
import { Mutation } from "../../../services/mutation-service";

export type QueryKeys = "genes" | "image" | "mutations";
export type MutationItemTypes = Gene | Mutation;

type optimisticTypes = "SaveNew" | "Delete" | "Update";
export const optimisticallyUpdate = (
  type: optimisticTypes,
  queryKey: QueryKeys,
  newItem: any,
  qClient?: QueryClient
) => {
  const queryClient = qClient ?? useQueryClient();
  // Cancel any outgoing re-fetches
  // (so they don't overwrite our optimistic update)
  queryClient.cancelQueries({ queryKey: [queryKey] });

  // Snapshot the previous value
  const previousItems = queryClient.getQueryData([queryKey]);

  if (type === "Update") {
    const updated = (previousItems as any[]).map((item) => {
      if (item.id === newItem.id) {
        return newItem;
      }
      return item;
    });

    queryClient.setQueryData([queryKey], (oldItems) => {
      return updated;
    });
  }

  if (type === "SaveNew") {
    // Optimistically update to the new value
    queryClient.setQueryData([queryKey], (oldItems) => {
      return [...(oldItems as any[]), newItem];
    });
  }

  return previousItems;
};
