import React, { useState } from "react";
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
  const toggleHand = () => {
    setHandIsOpen(!handIsOpen);
  };
  const setHand = (value: boolean) => {
    setHandIsOpen(value);
  };

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
        {containers.map((id) => (
          // We updated the Droppable component so it would accept an `id`
          // prop and pass it to `useDroppable`
          <Grid key={id} item xs={4}>
            <Droppable key={id} droppableId={id}>
              {parent === id ? draggedCards[0] : <PlaySlot></PlaySlot>}
            </Droppable>
          </Grid>
        ))}
      </Grid>
      <PlayerHand cards={draggedCards} handIsOpen={handIsOpen}></PlayerHand>
    </DndContext>
  );

  function handleDragStart(event: DragStartEvent) {
    // event.active.data.console.log("Drag Start");
    setHand(false);
  }

  function handleDragEnd(event: any) {
    const { over } = event;

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    setParent(over ? over.id : null);
  }
}
