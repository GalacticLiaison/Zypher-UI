import React, { useEffect, useState } from "react";
import { DndContext } from "@dnd-kit/core";

import { Droppable } from "./Droppable";
import { Draggable } from "./Draggable";
import { CombatCard } from "../CombatCards/CombatCard";
import Grid from "@mui/material/Grid";

export interface IHandProps {
  cards?: CombatCard[];
}

export const Hand_proto = (props: IHandProps) => {
  // const containers = ["A", "B", "C"];
  // const [parent, setParent] = useState(null);
  // const draggableMarkup = <Draggable id="draggable">Drag me</Draggable>;

  const [cards, setCards] = useState<CombatCard[] | undefined>(props.cards);
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
    <Droppable key={"playerHand"} id={"playerHand"}>
      <Grid container spacing={2}>
        {cards?.map((card, index) => {
          return (
            <Grid key={index} item xs={2}>
              <Draggable id={card.id.toString()}>
                <CombatCard card={card}></CombatCard>;
              </Draggable>
            </Grid>
          );
        })}
      </Grid>
    </Droppable>
  );
};
