import { Perk, StatChange } from "./character-service/Character";
import { Rarity } from "./rarity-service";

export interface Mutation {
  id: string;
  name: string;
  description: string;
  rarity: Rarity;
  geneId: string;
  strainId: string;
  discovered: boolean;
  image: string;
  affectedBodyPart: string;
  bodyPartMutations: [];
  appliedStatBonuses: StatChange[];
  appliedStatuses: [];
  appliedPerks: Perk[];
  requiredMutationIds: string[];
}

export const getStableMutations = (): Mutation[] => {
  return [] as Mutation[];
};

export const applyMutation = (): void => {};

const removeMutation = (mutationId: string): void => {};
