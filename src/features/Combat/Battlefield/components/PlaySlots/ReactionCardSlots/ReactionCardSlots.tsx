import Grid from "@mui/material/Grid";
import { IPlaySlotStyleTemplate, PlaySlot } from "../PlaySlot";
import { CombatCard } from "../../../../CombatCards/CombatCard";

interface IReactionCardSlotsProps {
  slot1Card: CombatCard | undefined;
  slot2Card: CombatCard | undefined;
  slot3Card: CombatCard | undefined;
  droppableIdPrefix: string;
}

export function ReactionCardSlots(props: IReactionCardSlotsProps) {
  const styleTemplate: IPlaySlotStyleTemplate = {
    backgroundColor: "salmon",
  };

  return (
    <Grid id="reactions" container item justifyContent="center" xs={12}>
      <Grid item xs={2}>
        <PlaySlot
          droppableId={`${props.droppableIdPrefix}1`}
          card={props.slot1Card}
          styleTemplate={styleTemplate}
        ></PlaySlot>
      </Grid>
      <Grid item xs={2}>
        <PlaySlot
          droppableId={`${props.droppableIdPrefix}2`}
          card={props.slot2Card}
          styleTemplate={styleTemplate}
        ></PlaySlot>
      </Grid>
      <Grid item xs={2}>
        <PlaySlot
          droppableId={`${props.droppableIdPrefix}3`}
          card={props.slot3Card}
          styleTemplate={styleTemplate}
        ></PlaySlot>
      </Grid>
    </Grid>
  );
}
