import Grid from "@mui/material/Grid";
import { ReactionCardSlots } from "../../PlaySlots/ReactionCardSlots/ReactionCardSlots";
import { SpawnCardSlots } from "../../PlaySlots/SpawnCardSlots/SpawnCardSlots";
import { Portrait } from "../../Portrait/Portrait";
import { CombatCard } from "../../../../CombatCards/CombatCard";
import { Combatant } from "../../../../Combat";
import { useEffect, useState } from "react";

export interface ITopCombatantProps {
  index: number;
  combatant: Combatant;
  columns?: number;
  spawn1Slot?: CombatCard | undefined;
  spawn2Slot?: CombatCard | undefined;
  spawn3Slot?: CombatCard | undefined;
  reaction1Slot?: CombatCard | undefined;
  reaction2Slot?: CombatCard | undefined;
  reaction3Slot?: CombatCard | undefined;
  handleCardClick: (card: CombatCard) => void;
}

export const TopCombatant = (props: ITopCombatantProps) => {
  const [combatant, setCombatant] = useState<Combatant>(props.combatant);
  useEffect(() => {
    setCombatant(props.combatant);
  }, [props.combatant]);

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
        slot1Card={props.reaction1Slot}
        slot2Card={props.reaction2Slot}
        slot3Card={props.reaction3Slot}
        droppableIdPrefix={`top-${props.index}-reaction`}
      ></ReactionCardSlots>
      <SpawnCardSlots
        slot1Card={props.spawn1Slot}
        slot2Card={props.spawn2Slot}
        slot3Card={props.spawn3Slot}
        droppableIdPrefix={`top-${props.index}-spawn`}
      ></SpawnCardSlots>
    </Grid>
  );
};
