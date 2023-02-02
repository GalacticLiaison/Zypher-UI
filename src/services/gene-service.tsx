import { Mutation } from "./mutation-service";
import { Rarity } from "./rarity-service";

export interface Gene {
  id: string;
  name: string;
  description: string;
  rarity: Rarity;
  speciesId: string;
  discovered: boolean;
  xenogenCost: {
    standard: number;
    rare: number;
    epic: number;
    legendary: number;
  };
  strains: Strain[];
  image: string;
}

export interface Strain {
  id: string;
  name: string;
  description: string;
  rarity: Rarity;
  geneId: string;
  discovered: boolean;
  possibleMutations: Mutation[];
  image: string;
}

export const getDiscoveredGenes = (): Gene[] => {
  return [];
};

export const discoverGene = (geneId: number) => {};

export const applyGene = (strainId: number) => {};

// Discover Gene(geneId: number)
// Apply Gene(strainId: number)
