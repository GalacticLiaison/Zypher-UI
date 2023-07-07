import { useEffect, useRef, useState } from "react";
import { Combatant } from "../Combat";
import { Battle } from "./Battle";

export type Turn = {
  combatant: Combatant;
  position: "top" | "bottom";
  positionIndex: number;
  isPlayer: boolean;
};

export type TurnPhase = "start" | "draw" | "play" | "spawn" | "end";

export interface IBattleExecutorProps {
  topTeamCombatants: Combatant[];
  bottomTeamCombatants: Combatant[];
}

export function BattleExecutor(props: IBattleExecutorProps) {
  /*
    Responsibilities:
    - Manage Turn Queue
    - Manage Current Turn Phases
  */

  // ====================== Passed  Data ======================

  const [topTeamCombatants, setTopTeamCombatants] = useState<Combatant[]>(
    props.topTeamCombatants
  );
  const [bottomTeamCombatants, setBottomTeamCombatants] = useState<Combatant[]>(
    props.bottomTeamCombatants
  );
  useEffect(() => {
    setTopTeamCombatants(props.topTeamCombatants);
  }, [props.topTeamCombatants]);
  useEffect(() => {
    setBottomTeamCombatants(props.bottomTeamCombatants);
  }, [props.bottomTeamCombatants]);

  // ====================== Turn Management ======================

  // === Turn Queue ===
  const [turnQueue, setTurnQueue] = useState<Turn[]>(calculateTurnOrder());
  const [currentTurn, setCurrentTurn] = useState<Turn>({
    combatant: props.bottomTeamCombatants[0],
    position: "bottom",
    positionIndex: 0,
    isPlayer: true,
  });

  function calculateTurnOrder(): Turn[] {
    // Future State will do the agility calculation here
    return [
      {
        combatant: props.topTeamCombatants[0],
        position: "top",
        positionIndex: 0,
        isPlayer: false,
      },
      {
        combatant: props.topTeamCombatants[1],
        position: "top",
        positionIndex: 1,
        isPlayer: false,
      },
    ];
  }

  // === Current Turn ===
  const [turnPhase, setTurnPhase] = useState<TurnPhase>("start");

  const completeTurnPhase = (currentTurnPhase: TurnPhase) => {
    switch (turnPhase) {
      case "start":
        setNextPhase("draw");
        break;
      case "draw":
        setNextPhase("play");
        break;
      case "play":
        setNextPhase("spawn");
        break;
      case "spawn":
        setNextPhase("end");
        break;
      case "end":
        setNextPhase("start");
        endTurn();
        break;
      default:
        console.error("BattleExecutor: Invalid Turn Phase");
        break;
    }

    function setNextPhase(nextPhase: TurnPhase | "") {
      if (nextPhase != "") {
        const ENABLE_BATTLE_LOGS = true;
        if (ENABLE_BATTLE_LOGS) {
          console.log(
            `Turn Phase: ${currentTurnPhase} -> ${nextPhase} for ${currentTurn.combatant.name}`
          );
        }
        setTurnPhase(nextPhase);
      } else {
        console.error("Failed to complete turn phase");
      }
    }
  };

  const endTurn = () => {
    const nextTurn = turnQueue.shift()!;
    setCurrentTurn(nextTurn);
    setTurnQueue([...turnQueue, currentTurn]);
  };

  return (
    <Battle
      topTeamCombatants={topTeamCombatants}
      bottomTeamCombatants={bottomTeamCombatants}
      currentTurn={currentTurn}
      turnPhase={turnPhase}
      completeTurnPhase={completeTurnPhase}
    ></Battle>
  );
}
