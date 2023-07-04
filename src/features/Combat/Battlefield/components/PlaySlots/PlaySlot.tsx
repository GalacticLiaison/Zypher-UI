import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useEffect, useState } from "react";
import { CombatCard } from "../../../CombatCards/CombatCard";
import { Droppable } from "../../../../Drag-Drop/Droppable";

export interface IPlaySlotStyleTemplate {
  backgroundColor?: string;
}

export interface IPlaySlotProps {
  card?: CombatCard;
  canAttack?: boolean;
  droppableId?: string;
  styleTemplate?: IPlaySlotStyleTemplate;
  ref?: any;
}

export const PlaySlot = (props: IPlaySlotProps) => {
  const [card, setCard] = useState<CombatCard | undefined>(props.card);
  useEffect(() => {
    if (props.card == undefined) return;
    setCard(props.card);
  }, [props.card]);

  const [canAttack, setCanAttack] = useState<boolean>(false);
  useEffect(() => {
    if (props.canAttack == undefined) return;
    if (card && props.canAttack == true) setCanAttack(props.canAttack);
  }, [props.canAttack]);

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

const defaultEmptyCard = (
  <Card
    sx={{
      // minWidth: 50,
      height: "12em",
      // maxHeight: "100%",
      maxWidth: "77%",
      boxShadow:
        "0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23)" /* Shadow */,
      overflow: "scroll",
      "&::-webkit-scrollbar": {
        display: "none",
      },
      "&::MsOverflowStyle": "none",
      "&::scrollbarWidth": "none",
      position: "relative",
    }}
  >
    <CardContent></CardContent>
  </Card>
);
