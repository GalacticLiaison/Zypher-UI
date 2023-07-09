import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Droppable } from "../../../../../../Drag-Drop/Droppable";
import { Draggable } from "../../../../../../Drag-Drop/Draggable";
import { CombatCard } from "../../../../../CombatCards/CombatCard";
import { SpawnCard } from "../../../../../CombatCards/SpawnCard";

export interface IHandProps {
  combatantPositionId: string;
  cards?: (CombatCard | SpawnCard)[];
}

export const Hand = (props: IHandProps) => {
  // const containers = ["A", "B", "C"];
  // const [parent, setParent] = useState(null);
  // const draggableMarkup = <Draggable id="draggable">Drag me</Draggable>;

  const [cards, setCards] = useState<(CombatCard | SpawnCard)[] | undefined>(
    props.cards
  );
  useEffect(() => {
    if (props.cards == undefined) return;
    setCards(props.cards);
  }, [props.cards]);

  // DESIGN: Player Hand
  //  - Hand is one big droppable
  //  - Cards are individual draggable
  //  - When a card is dropped on the hand, it is added to the hand
  //  - When a card is dropped on the board (other droppable), it is removed from the hand
  // STRETCH:
  //  - When card is dropped between two other cards in hand, card is inserted in between

  return (
    <Droppable key={"playerHand"} droppableId={"playerHand"}>
      <Grid container>
        {cards?.map((card, index) => {
          return (
            <Grid key={index} item xs={3}>
              <Draggable id={`${props.combatantPositionId}-hand-${index}`}>
                <CombatCard card={card}></CombatCard>
              </Draggable>
            </Grid>
          );
        })}
      </Grid>
    </Droppable>
  );
};
