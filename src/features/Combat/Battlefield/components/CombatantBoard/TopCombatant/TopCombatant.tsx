import Grid from "@mui/material/Grid";
import {
  ReactionCardSlots,
  ReactionSlot,
} from "../../PlaySlots/ReactionCardSlots/ReactionCardSlots";
import {
  SpawnCardSlots,
  SpawnSlot,
} from "../../PlaySlots/SpawnCardSlots/SpawnCardSlots";
import { Portrait } from "../../Portrait/Portrait";
import { CombatCard } from "../../../../CombatCards/CombatCard";
import { Combatant } from "../../../../Combat";
import { useEffect, useState } from "react";

export interface ITopCombatantProps {
  index: number;
  combatant: Combatant;
  columns?: number;
  spawnSlotLayout: Map<number, SpawnSlot>;
  reactionSlotLayout: Map<number, ReactionSlot>;

  handleCardClick: (card: CombatCard) => void;
}

export const TopCombatant = (props: ITopCombatantProps) => {
  const [combatant, setCombatant] = useState<Combatant>(props.combatant);
  useEffect(() => {
    setCombatant(props.combatant);
  }, [props.combatant]);

  const [spawnSlotLayout, setSpawnSlotLayout] = useState<
    Map<number, SpawnSlot>
  >(props.spawnSlotLayout);
  useEffect(() => {
    setSpawnSlotLayout(props.spawnSlotLayout);
  }, [props.spawnSlotLayout]);

  const [reactionSlotLayout, setReactionSlotLayout] = useState<
    Map<number, ReactionSlot>
  >(props.reactionSlotLayout);
  useEffect(() => {
    setReactionSlotLayout(new Map(props.reactionSlotLayout));
  }, [props.reactionSlotLayout]);

  return (
    <Grid container item xs={props.columns ?? 12} spacing={3}>
      <Grid id="portrait" container item xs={12}>
        <Grid item xs={5}></Grid>
        <Grid item xs={2}>
          <Portrait combatant={combatant}></Portrait>
        </Grid>
        <Grid item xs={5}></Grid>
        <Grid item xs={12}></Grid>
      </Grid>
      <ReactionCardSlots
        slotLayout={reactionSlotLayout}
        droppableIdPrefix={`top-${props.index}-reaction-`}
      ></ReactionCardSlots>
      <SpawnCardSlots
        slotLayout={spawnSlotLayout}
        droppableIdPrefix={`top-${props.index}-spawn-`}
      ></SpawnCardSlots>
    </Grid>
  );
};
