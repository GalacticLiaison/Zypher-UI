import { CombatantBoardData } from "../Battle/Battle";
import { CombatCard } from "../CombatCards/CombatCard";
import { SpawnCard } from "../CombatCards/SpawnCard";

export const AI_TakeTurn = (
  removeCardFromHand: (hand: CombatCard[], handIndex: number) => void,
  aiBoard?: CombatantBoardData,
  aiHand?: (CombatCard | SpawnCard)[]
) => {
  if (!aiBoard || !aiHand) {
    console.error("AI_TakeTurn: aiBoard or aiHand is undefined");
    return;
  }

  console.log("AI_TakeTurn");

  let spawn;
  let spawnIndex;
  for (let i = 0; i < aiHand.length; i++) {
    if (aiHand[i].type === "Spawn") {
      spawn = aiHand[i];
      spawnIndex = i;
      break;
    }
  }

  if (spawn && spawnIndex) {
    const spawnSlotLayout = new Map(aiBoard.spawnSlotLayout);

    if (spawnSlotLayout.get(0)) return;

    spawnSlotLayout.set(0, spawn as SpawnCard);
    aiBoard.spawnSlotLayout = spawnSlotLayout;
    removeCardFromHand(aiBoard.combatant.hand, spawnIndex);
  }
};
