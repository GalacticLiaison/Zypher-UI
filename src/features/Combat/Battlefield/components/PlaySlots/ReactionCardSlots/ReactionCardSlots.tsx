import Grid from "@mui/material/Grid";
import { ReactionCard } from "../../../../CombatCards/ReactionCard";
import { useEffect, useState } from "react";
import {
  determineNumberOfSlots,
  determineSlotWidth,
} from "../utils/card-slot-helpers";
import {
  IPlaySlotStyleTemplate,
  PlaySlot,
} from "../components/PlaySlot/PlaySlot";
import { PlaySlots } from "../PlaySlots";

export type ReactionSlot = ReactionCard | null;

export interface IReactionCardSlotsProps {
  slotLayout: Map<number, ReactionSlot>;
  droppableIdPrefix: string;
}

export function ReactionCardSlots(props: IReactionCardSlotsProps) {
  const styleTemplate: IPlaySlotStyleTemplate = {
    backgroundColor: "salmon",
  };

  const [slotLayout, setSlotLayout] = useState<Map<number, ReactionSlot>>(
    props.slotLayout
  );
  useEffect(() => {
    setSlotLayout(new Map(props.slotLayout));
  }, [props.slotLayout]);

  return (
    <PlaySlots
      slots={slotLayout}
      droppableIdPrefix={props.droppableIdPrefix}
      styleTemplate={styleTemplate}
      id="Reactions"
    ></PlaySlots>
  );
}
