import { useEffect, useState } from "react";
import { CombatCard } from "../../../../../../../CombatCards/CombatCard";
import { Droppable } from "../../../../../../../../Drag-Drop/Droppable";

export interface IPlaySlotStyleTemplate {
  backgroundColor?: string;
}

export interface IPlaySlotProps {
  card: CombatCard | null | undefined;
  canAttack?: boolean;
  droppableId?: string;
  styleTemplate?: IPlaySlotStyleTemplate;
  ref?: any;
}

export const PlaySlot = (props: IPlaySlotProps) => {
  const [card, setCard] = useState<CombatCard | null | undefined>(props.card);
  useEffect(() => {
    if (props.card === undefined) return;
    setCard(props.card);
  }, [props.card]);

  const slot = (
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
    <span ref={props.ref}>
      <Droppable droppableId={props.droppableId ?? "noId"}>
        {card ? (
          <CombatCard
            card={card}
            size={{ height: "12em", maxWidth: "77%" }}
            played={true}
          ></CombatCard>
        ) : (
          slot
        )}
      </Droppable>
    </span>
  );
};
