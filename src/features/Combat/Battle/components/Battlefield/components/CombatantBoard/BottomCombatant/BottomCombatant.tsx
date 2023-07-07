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
import { Hand } from "../../Hand/Hand";
import { Deck } from "../../Deck/Deck";
import { useEffect, useState } from "react";

export interface IBottomCombatantProps {
  index: number;
  combatant: Combatant;
  columns?: number;
  spawnSlotLayout: Map<number, SpawnSlot>;
  reactionSlotLayout: Map<number, ReactionSlot>;

  handleCardClick: (card: CombatCard) => void;
}

export const BottomCombatant = (props: IBottomCombatantProps) => {
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

  return (
    <Grid container item xs={props.columns ?? 12} spacing={3}>
      <SpawnCardSlots
        slotLayout={spawnSlotLayout}
        droppableIdPrefix={`bottom-${props.index}-spawn-`}
      ></SpawnCardSlots>
      <ReactionCardSlots
        slotLayout={reactionSlotLayout}
        droppableIdPrefix={`bottom-${props.index}-reaction-`}
      ></ReactionCardSlots>
      <Grid id="playerCards" container item spacing={3} xs={12}>
        <Grid item xs={10}>
          <Hand
            combatantPositionId={`bottom-${props.index}`}
            cards={combatant.hand}
          ></Hand>
        </Grid>
        <Grid item xs={2}>
          <Deck count={combatant.deck.length}></Deck>
        </Grid>
      </Grid>
      <Grid id="portrait" container item xs={12}>
        <Grid item xs={5}></Grid>
        <Grid item xs={2}>
          <Portrait combatant={combatant}></Portrait>
        </Grid>
        <Grid item xs={5}></Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </Grid>
  );
};
