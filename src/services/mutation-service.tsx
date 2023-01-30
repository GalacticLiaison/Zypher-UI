export interface Mutation {
  id: string;
  name: string;
  description: string;
  rarity: string;
  geneId: string;
  strainId: string;
  discovered: boolean;
  affectedBodyPart: string;
  bodyPartMutations: [];
  appliedStatBonuses: [];
  appliedStatuses: [];
  appliedPerks: [];
  requiredMutationIds: string[];
}

export const getStableMutations = (): Mutation[] => {
  return [] as Mutation[];
};

export const applyMutation = (): void => {};

const removeMutation = (mutationId: string): void => {};
