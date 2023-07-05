import { CombatCard } from "./CombatCard";

export interface SpawnCard extends CombatCard {
  type: "Spawn";
  attack: number;
  health: number;
}
