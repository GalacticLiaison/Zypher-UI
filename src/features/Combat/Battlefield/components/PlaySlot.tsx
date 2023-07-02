import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Droppable } from "../../DraggableAndDroppable/Droppable";
import { useEffect, useState } from "react";
import { CombatCard } from "../../CombatCards/CombatCard";

export interface IPlaySlotProps {
  card?: CombatCard;
  droppableId?: string;
}

export const PlaySlot = (props: IPlaySlotProps) => {
  const [card, setCard] = useState<CombatCard | undefined>(props.card);
  useEffect(() => {
    if (props.card == undefined) return;
    console.log("PlaySlot: useEffect: props.card: ", props.card);
    setCard(props.card);
  }, [props.card]);

  return (
    <Droppable droppableId={props.droppableId ?? "noId"}>
      {card ? (
        <CombatCard
          card={card}
          size={{ height: "12em", maxWidth: "77%" }}
          played={true}
        ></CombatCard>
      ) : (
        defaultEmptyCard
      )}
    </Droppable>
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
