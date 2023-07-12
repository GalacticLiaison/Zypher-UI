import { TopCombatant } from "./TopCombatant/TopCombatant";
import { BottomCombatant } from "./BottomCombatant/BottomCombatant";
import { useEffect, useState } from "react";
import { CombatCard } from "../../../../../CombatCards/CombatCard";

export interface ICombatantBoardProps {
  position: "top" | "bottom";
  index: number;
  combatantId: string;
  // columns?: number | undefined;
  handleCardClick: (card: CombatCard) => void;
}

export const CombatantBoard = (props: ICombatantBoardProps) => {
  /*
    Responsibilities:
    - Manage State of Single Combatant
      - Deck
      - Draw Cards
      - Hand
  */

  // ====================== Passed  Data ======================

  const [combatantId, setCombatantId] = useState<string>(props.combatantId);
  useEffect(() => {
    setCombatantId(props.combatantId);
  }, [props.combatantId]);

  return props.position === "top" ? (
    <TopCombatant
      index={props.index}
      combatantId={combatantId}
      handleCardClick={props.handleCardClick}
    ></TopCombatant>
  ) : (
    <BottomCombatant
      index={props.index}
      combatantId={combatantId}
      handleCardClick={props.handleCardClick}
    ></BottomCombatant>
  );
};
