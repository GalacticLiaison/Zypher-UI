import React from "react";
import { useDraggable } from "@dnd-kit/core";
import Grid from "@mui/material/Grid";
import { PlaySlot } from "../../../Battlefield/components/PlaySlot";
import { CombatCard } from "../../../CombatCards/CombatCard";

interface IReactionCardSlotsProps {
  slot1Card: CombatCard | undefined;
  slot2Card: CombatCard | undefined;
  slot3Card: CombatCard | undefined;
  droppableIdPrefix: string;
}

export function ReactionCardSlots(props: any) {
  return (
    <Grid container justifyContent="space-evenly">
      <Grid item xs={2}>
        <PlaySlot
          droppableId={`${props.droppableIdPrefix}1`}
          card={props.slot1Card}
        ></PlaySlot>
      </Grid>
      <Grid item xs={2}>
        <PlaySlot
          droppableId={`${props.droppableIdPrefix}2`}
          card={props.slot2Card}
        ></PlaySlot>
      </Grid>
      <Grid item xs={2}>
        <PlaySlot
          droppableId={`${props.droppableIdPrefix}3`}
          card={props.slot3Card}
        ></PlaySlot>
      </Grid>
    </Grid>
  );
}
