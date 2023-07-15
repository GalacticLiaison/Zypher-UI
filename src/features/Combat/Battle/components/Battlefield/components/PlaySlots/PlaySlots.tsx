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
import { MINIMUM_SLOTS } from "../../../../../Combat";
import { useSelector } from "react-redux";
import { CombatState, CombatantBoardData } from "../../../../../combatSlice";

export type PlaySlotsType = "Spawn" | "Reaction";

export interface IPlaySlotsProps {
  combatantId: string;
  playSlotsType: PlaySlotsType;
  position: "top" | "bottom";
  droppableIdPrefix: string;
  id?: string;
  // styleTemplate?: IPlaySlotStyleTemplate;
}

export const PlaySlots = (props: IPlaySlotsProps) => {
  const styleTemplate: IPlaySlotStyleTemplate = {
    backgroundColor: props.playSlotsType === "Spawn" ? "lightgreen" : "salmon",
  };
  const { battlefieldData } = useSelector(
    (store: any) => store.combat
  ) as CombatState;

  const [combatantId, setCombatantId] = useState<string>();
  useEffect(() => {
    setCombatantId(props.combatantId);
  }, [props.combatantId]);

  // Developer Note: look... I realize this calculation will need to be performed twice on every combatant's board...
  // IF we notice performance issues we could think about going back to passing everything as a finicky prop. But I want to explore
  // grabbing everything from the store and only passing the absolute minimum amount of data needed.
  // ALTERNATIVE: Explore how to make the store more performant to query.
  const getSlots = (): Array<PlaySlot> => {
    let slotsData: Array<PlaySlot> = [];

    if (battlefieldData) {
      const team =
        props.position === "top"
          ? battlefieldData.topTeam
          : battlefieldData.bottomTeam;
      const boardData = team.find(
        (board: CombatantBoardData) => board.combatant.id === combatantId
      );
      if (boardData) {
        slotsData =
          props.playSlotsType === "Spawn"
            ? boardData.spawnSlotLayout
            : boardData.reactionSlotLayout;
      }
    }

    if (slotsData.length === 0)
      slotsData = [...Array(MINIMUM_SLOTS)].map(() => {
        return null;
      });

    return slotsData;
  };

  const [slots, setSlots] = useState<Array<PlaySlot>>(getSlots());

  useEffect(() => {
    setSlots(getSlots());
  }, [battlefieldData]);

  return (
    <Grid
      id={props.id}
      container
      item
      justifyContent="center"
      xs={12}
      spacing={1}
    >
      {slots.map((slot, index) => {
        return (
          <Grid key={index} item xs={determineSlotWidth(slots)}>
            <PlaySlot
              position={props.position}
              slot={slot}
              droppableId={`${props.droppableIdPrefix}${index}`}
              styleTemplate={styleTemplate}
            ></PlaySlot>
          </Grid>
        );
      })}
    </Grid>
  );
};
