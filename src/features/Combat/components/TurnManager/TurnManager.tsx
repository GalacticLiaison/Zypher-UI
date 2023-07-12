import { Combatant } from "../../Combat";
import {
  CombatState,
  drawCard,
  endTurn,
  setCurrentTurnPhase,
  setTurnPhaseIsComplete,
  spawnsAttack,
} from "../../combatSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { AI__TakeTurn } from "../../AI/AI";

export type Turn = {
  combatant: Combatant;
  position: "top" | "bottom";
  positionIndex: number;
  isPlayer: boolean;
};

export type TurnPhase = "start" | "draw" | "play" | "spawn" | "end";

export const TurnManager = () => {
  const lastPhaseRan = useRef<TurnPhase | "">("");

  const { currentTurn, currentTurnPhase, turnPhaseIsComplete } = useSelector(
    (store: any) => store.combat
  ) as CombatState;

  const dispatch = useDispatch();

  useEffect(() => {
    if (lastPhaseRan.current == currentTurnPhase) {
      return;
    }

    switch (currentTurnPhase) {
      case "start":
        completeTurnPhase();
        break;
      case "draw":
        dispatch(drawCard());
        completeTurnPhase();
        break;
      case "play":
        if (currentTurn.isPlayer === false) {
          setTimeout(() => {
            AI__TakeTurn();
            // setTopTeam([...topTeam]);
            // setBottomTeam([...bottomTeam]);
            completeTurnPhase();
          }, 2000);
        }
        // Button Press Ends Play Phase
        break;
      case "spawn":
        dispatch(spawnsAttack());
        completeTurnPhase();

        break;
      case "end":
        completeTurnPhase();

        break;
      default:
        console.error("Battle: Invalid Turn Phase");
        break;
    }
  }, [currentTurnPhase]);

  useEffect(() => {
    if (turnPhaseIsComplete) {
      dispatch(setTurnPhaseIsComplete(false));
      completeTurnPhase();
    }
  }, [turnPhaseIsComplete]);

  const completeTurnPhase = () => {
    switch (currentTurnPhase) {
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
        dispatch(endTurn());
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
        dispatch(setCurrentTurnPhase(nextPhase));
      } else {
        console.error("Failed to complete turn phase");
      }
    }
  };

  return <></>;
};
