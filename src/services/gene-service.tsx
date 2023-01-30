import { Mutation } from "./mutation-service";

export interface Gene {
  id: string;
  name: string;
  description: string;
  rarity: string;
  speciesId: string;
  discovered: boolean;
  xenogenCost: {
    standard: number;
    rare: number;
    epic: number;
    legendary: number;
  };
  strains: Strain[];
}

export interface Strain {
  id: string;
  name: string;
  description: string;
  rarity: string;
  geneId: string;
  discovered: boolean;
  possibleMutations: Mutation[];
}

export const getDiscoveredGenes = () => {};

export const discoverGene = (geneId: number) => {};

export const applyGene = (strainId: number) => {};

// Discover Gene(geneId: number)
// Apply Gene(strainId: number)
