import { CombatCard } from "../../../CombatCards/CombatCard";
import { Combatant } from "../../../Combat";
import { TopCombatant } from "./TopCombatant/TopCombatant";
import { BottomCombatant } from "./BottomCombatant/BottomCombatant";
import { useEffect, useState } from "react";
import { SpawnCard } from "../../../CombatCards/SpawnCard";

export interface ICombatantBoardProps {
  position: "top" | "bottom";
  index: number;
  combatant: Combatant;
  columns?: number | undefined;
  spawn1Slot?: SpawnCard | undefined;
  spawn2Slot?: SpawnCard | undefined;
  spawn3Slot?: SpawnCard | undefined;
  reaction1Slot?: CombatCard | undefined;
  reaction2Slot?: CombatCard | undefined;
  reaction3Slot?: CombatCard | undefined;
  handleCardClick: (card: CombatCard) => void;
}

export const CombatantBoard = (props: ICombatantBoardProps) => {
  const [combatant, setCombatant] = useState<Combatant>(props.combatant);
  useEffect(() => {
    setCombatant(props.combatant);
  }, [props.combatant]);

  return props.position === "top" ? (
    <TopCombatant
      index={props.index}
      columns={props.columns}
      combatant={combatant}
      spawn1Slot={props.spawn1Slot}
      spawn2Slot={props.spawn2Slot}
      spawn3Slot={props.spawn3Slot}
      reaction1Slot={props.reaction1Slot}
      reaction2Slot={props.reaction2Slot}
      reaction3Slot={props.reaction3Slot}
      handleCardClick={props.handleCardClick}
    ></TopCombatant>
  ) : (
    <BottomCombatant
      index={props.index}
      columns={props.columns}
      combatant={combatant}
      spawn1Slot={props.spawn1Slot}
      spawn2Slot={props.spawn2Slot}
      spawn3Slot={props.spawn3Slot}
      reaction1Slot={props.reaction1Slot}
      reaction2Slot={props.reaction2Slot}
      reaction3Slot={props.reaction3Slot}
      handleCardClick={props.handleCardClick}
    ></BottomCombatant>
  );
};
