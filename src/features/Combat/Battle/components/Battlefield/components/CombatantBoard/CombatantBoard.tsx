import { CombatCard } from "../../../CombatCards/CombatCard";
import { Combatant } from "../../../Combat";
import { TopCombatant } from "./TopCombatant/TopCombatant";
import { BottomCombatant } from "./BottomCombatant/BottomCombatant";
import { useEffect, useState } from "react";
import { SpawnSlot } from "../PlaySlots/SpawnCardSlots/SpawnCardSlots";
import { ReactionSlot } from "../PlaySlots/ReactionCardSlots/ReactionCardSlots";

export interface ICombatantBoardProps {
  position: "top" | "bottom";
  index: number;
  combatant: Combatant;
  columns?: number | undefined;
  spawnSlotLayout: Map<number, SpawnSlot>;
  reactionSlotLayout: Map<number, ReactionSlot>;
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
  const [combatant, setCombatant] = useState<Combatant>(props.combatant);
  useEffect(() => {
    setCombatant(props.combatant);
  }, [props.combatant]);

  const [spawnSlotLayout, setSpawnSlotLayout] = useState<
    Map<number, SpawnSlot>
  >(props.spawnSlotLayout);
  useEffect(() => {
    setSpawnSlotLayout(new Map(props.spawnSlotLayout));
  }, [props.spawnSlotLayout]);

  const [reactionSlotLayout, setReactionSlotLayout] = useState<
    Map<number, ReactionSlot>
  >(props.reactionSlotLayout);
  useEffect(() => {
    setReactionSlotLayout(new Map(props.reactionSlotLayout));
  }, [props.reactionSlotLayout]);

  return props.position === "top" ? (
    <TopCombatant
      index={props.index}
      columns={props.columns}
      combatant={combatant}
      spawnSlotLayout={spawnSlotLayout}
      reactionSlotLayout={reactionSlotLayout}
      handleCardClick={props.handleCardClick}
    ></TopCombatant>
  ) : (
    <BottomCombatant
      index={props.index}
      columns={props.columns}
      combatant={combatant}
      spawnSlotLayout={spawnSlotLayout}
      reactionSlotLayout={reactionSlotLayout}
      handleCardClick={props.handleCardClick}
    ></BottomCombatant>
  );
};
