import React, { useEffect, useState } from "react";
import { DndContext, DragStartEvent } from "@dnd-kit/core";
import { Draggable } from "./DraggableAndDroppable/Draggable";
import { Droppable } from "./DraggableAndDroppable/Droppable";
import Grid from "@mui/material/Grid";
import { CombatCard } from "./CombatCards/CombatCard";
import { PlaySlot } from "./Battlefield/components/PlaySlot";
import { PlayerHand } from "./PlayerHand/PlayerHandv2";
import Button from "@mui/material/Button";

export function CombatEvolved() {
  const containers = ["A", "B", "C"];
  const [parent, setParent] = useState(null);

  const [handIsOpen, setHandIsOpen] = useState<boolean>(false);
  const [draggedCardId, setDraggedCardId] = useState<number>(0);

  const exampleCards: CombatCard[] = [
    {
      id: 1,
      name: "Laser Blast",
      description: "Fire everything!",
      cost: 1,
      type: "Action",
      subtype: "Test",
      rarity: "Common",
      image: "src/assets/cards/laserBlast.png",
    },
    {
      id: 2,
      name: "Force Field",
      description: "Da Bubble",
      cost: 1,
      type: "Reaction",
      subtype: "Test",
      rarity: "Common",
      image: "src/assets/cards/forceField.png",
    },
    {
      id: 3,
      name: "Deployable Auto Turret",
      description: "Relax, Its got this",
      cost: 1,
      type: "Spawn",
      subtype: "Test",
      rarity: "Common",
      image: "src/assets/cards/deployableAutoTurret.png",
    },
  ];

  const initialHand = new Map<number, JSX.Element>();
  exampleCards.forEach((card) => {
    initialHand.set(card.id, (
      <Draggable id={card.id.toString()}>
        <CombatCard card={card}></CombatCard>
      </Draggable>
    ));
  });
  
  const [draggedCardsIdMap, setDraggedCardsIdMap] = useState<Map<number, JSX.Element>>(initialHand);


  const toggleHand = () => {
    setHandIsOpen(!handIsOpen);
  };

  const setHand = (value: boolean) => {
    console.log("Setting Hand to: ", value)
    setHandIsOpen(value);
  };

  const draggedCards = exampleCards.map((card) => (
    <Draggable id={card.id.toString()}>
      <CombatCard card={card}></CombatCard>
    </Draggable>
  ));

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      {/* {parent === null ? draggableMarkup : null} */}
      <Button onClick={toggleHand}>Open Hand</Button>

      <Grid container spacing={3}>
        {
        containers.map((id) => (
          // We updated the Droppable component so it would accept an `id`
          // prop and pass it to `useDroppable`
          <Grid key={id} item xs={4}>
            <Droppable key={id} droppableId={id}>
              {parent === id ? draggedCardsIdMap.get(draggedCardId) : <PlaySlot></PlaySlot>}
            </Droppable>
          </Grid>
        ))}
      </Grid>
      <PlayerHand cards={draggedCardsIdMap} handIsOpen={handIsOpen}></PlayerHand>
    </DndContext>
  );

  

  function handleDragStart(event: DragStartEvent) {
    // console.log("Drag Start", event);
    setHand(false);
    setDraggedCardId(
      parseInt(event?.active?.id as string)
    )
  }

  function handleDragEnd(event: any) {
    const { over } = event;

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    setParent(over ? over.id : null);

    // remove card from hand

    draggedCardsIdMap.delete(draggedCardId);
    setDraggedCardsIdMap(draggedCardsIdMap);
    console.log(draggedCardsIdMap);
  }
}
