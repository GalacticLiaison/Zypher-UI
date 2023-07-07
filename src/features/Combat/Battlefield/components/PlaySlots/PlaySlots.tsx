import Grid from "@mui/material/Grid";
import {
  determineNumberOfSlots,
  determineSlotWidth,
} from "./utils/card-slot-helpers";
import {
  IPlaySlotStyleTemplate,
  PlaySlot,
} from "./components/PlaySlot/PlaySlot";
import { useEffect, useState } from "react";
import { ReactionSlot } from "./ReactionCardSlots/ReactionCardSlots";
import { SpawnSlot } from "./SpawnCardSlots/SpawnCardSlots";

export interface IPlaySlotsProps {
  slots: Map<number, ReactionSlot | SpawnSlot>;
  droppableIdPrefix: string;
  id?: string;
  styleTemplate?: IPlaySlotStyleTemplate;
}

export const PlaySlots = (props: IPlaySlotsProps) => {
  const [slots, setSlots] = useState<Map<number, ReactionSlot | SpawnSlot>>(
    props.slots
  );
  useEffect(() => {
    setSlots(new Map(props.slots));
  }, [props.slots]);

  return (
    <Grid
      id={props.id}
      container
      item
      justifyContent="center"
      xs={12}
      spacing={1}
    >
      {[...Array(determineNumberOfSlots(slots))].map((x, index) => {
        const slot = slots.get(index);
        return (
          <Grid key={index} item xs={determineSlotWidth(slots)}>
            <PlaySlot
              droppableId={`${props.droppableIdPrefix}${index}`}
              /* Developer Note: Again be careful with complex props,
              need to pass a fresh reference to have change detected*/
              card={slot ? { ...slot } : null}
              styleTemplate={props.styleTemplate}
            ></PlaySlot>
          </Grid>
        );
      })}
    </Grid>
  );
};
