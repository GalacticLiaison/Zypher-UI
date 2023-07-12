import { useDispatch, useSelector } from "react-redux";
import { SpawnCard } from "../CombatCards/SpawnCard";
import { CombatState } from "../combatSlice";

export const AI__TakeTurn = () => {
  const { currentTurn, currentTurnPhase } = useSelector(
    (store: any) => store.battle
  ) as CombatState;

  if (currentTurn.isPlayer) {
    console.error("State Error: Attempted to take AI turn as a player");
    return;
  }

  const AI = currentTurn.combatant;

  if (!AI) {
    console.error("AI combatant is missing");
    return;
  }

  const dispatch = useDispatch();

  let spawn;
  let spawnIndex;
  for (let i = 0; i < AI.hand.length; i++) {
    if (AI.hand[i].type === "Spawn") {
      spawn = AI.hand[i];
      spawnIndex = i;
      break;
    }
  }

  // if (spawn && spawnIndex) {
  //   const spawnSlotLayout = new Map(aiBoard.spawnSlotLayout);

  //   if (spawnSlotLayout.get(0)) return;

  //   spawnSlotLayout.set(0, spawn as SpawnCard);
  //   aiBoard.spawnSlotLayout = spawnSlotLayout;
  //   removeCardFromHand(aiBoard.combatant.hand, spawnIndex);
  // }
};
