import { useEffect, useState } from "react";
import { Droppable } from "../../../../../../../../Drag-Drop/Droppable";
import {
  ISpawnCardProps,
  SpawnCard,
} from "../../../../../../../CombatCards/SpawnCard";
import {
  IReactionCardProps,
  ReactionCard,
} from "../../../../../../../CombatCards/ReactionCard";

export interface IPlaySlotStyleTemplate {
  backgroundColor?: string;
}

export type PlaySlot = ISpawnCardProps | IReactionCardProps | null;

export interface IPlaySlotProps {
  position: "top" | "bottom";
  slot: PlaySlot;
  droppableId?: string;
  styleTemplate?: IPlaySlotStyleTemplate;
}

export const PlaySlot = (props: IPlaySlotProps) => {
  const [slot, setSlot] = useState<PlaySlot>(props.slot);

  useEffect(() => {
    if (props.slot) setSlot({ ...props.slot });
  }, [props.slot]);

  const defaultSlot = (
    <div
      style={{
        height: "9em",
        width: "6em",
        color: "lightgrey",
        backgroundColor: props.styleTemplate?.backgroundColor ?? "whitesmoke",
        borderWidth: "3px",
        borderStyle: "dashed",
        borderColor: "black",
      }}
    ></div>
  );

  return (
    <Droppable droppableId={props.droppableId ?? "noId"}>
      <div style={{ height: "9em", width: "6em" }}>
        {slot != null ? (
          slot.card?.type === "Spawn" ? (
            <SpawnCard
              card={slot.card as SpawnCard}
              played={true}
              position={props.position}
            ></SpawnCard>
          ) : (
            <ReactionCard
              card={slot.card as ReactionCard}
              played={true}
            ></ReactionCard>
          )
        ) : (
          defaultSlot
        )}
      </div>
    </Droppable>
  );
};
