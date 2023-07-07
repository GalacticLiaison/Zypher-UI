import { CombatantBoardData } from "../Battle/Battle";
import { CombatCard } from "../CombatCards/CombatCard";
import { SpawnCard } from "../CombatCards/SpawnCard";

export const AI_TakeTurn = (
  aiBoard?: CombatantBoardData,
  aiHand?: (CombatCard | SpawnCard)[]
) => {
  if (!aiBoard || !aiHand) {
    console.error("AI_TakeTurn: aiBoard or aiHand is undefined");
    return;
  }

  console.log("AI_TakeTurn");

  const spawn = aiHand.find((card) => card.type === "Spawn");

  if (spawn) {
    const spawnSlotLayout = new Map(aiBoard.spawnSlotLayout);

    if (spawnSlotLayout.get(0)) return;

    spawnSlotLayout.set(0, spawn as SpawnCard);
    aiBoard.spawnSlotLayout = spawnSlotLayout;
  }
};
