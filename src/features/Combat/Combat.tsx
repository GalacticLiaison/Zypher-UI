import { Battlefield } from "./Battlefield/Battlefield";
import { PlayerHand } from "./PlayerHand/PlayerHand";
import { DndContext } from "@dnd-kit/core";

import { Droppable } from "./DraggableAndDroppable/Droppable";
import { Draggable } from "./DraggableAndDroppable/Draggable";
import { useState } from "react";
import { CombatCard } from "./CombatCards/CombatCard";

interface ICombatProps {}

export const Combat = (props: ICombatProps) => {
  const [isDropped, setIsDropped] = useState(false);
  const draggableMarkup = (
    <Draggable>
      <CombatCard
        card={{
          id: 1,
          name: "Laser Blast",
          description: "Fire everything!",
          cost: 1,
          type: "Action",
          subtype: "Test",
          rarity: "Common",
          image: "src/assets/cards/laserBlast.png",
        }}
      ></CombatCard>
    </Draggable>
  );

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <CombatCard
        card={{
          id: 1,
          name: "Laser Blast",
          description: "Fire everything!",
          cost: 1,
          type: "Action",
          subtype: "Test",
          rarity: "Common",
          image: "src/assets/cards/laserBlast.png",
        }}
      ></CombatCard>
      <Battlefield />
    </DndContext>
  );

  function handleDragEnd(event: any) {
    if (event.over && event.over.id === "droppable") {
      setIsDropped(true);
    }
  }
};
