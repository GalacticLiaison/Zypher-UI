import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { Draggable } from "./DraggableAndDroppable/Draggable";
import { Droppable } from "./DraggableAndDroppable/Droppable";
import Grid from "@mui/material/Grid";

export function CombatEvolved() {
  const containers = ["A", "B", "C"];
  const [parent, setParent] = useState(null);
  const draggableMarkup = <Draggable id="draggable">Drag me</Draggable>;

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {parent === null ? draggableMarkup : null}
      <Grid container>
        {containers.map((id) => (
          // We updated the Droppable component so it would accept an `id`
          // prop and pass it to `useDroppable`
          <Grid item xs={4}>
            <Droppable key={id} droppableId={id}>
              {parent === id ? draggableMarkup : "Drop here"}
            </Droppable>
          </Grid>
        ))}
      </Grid>
    </DndContext>
  );

  function handleDragEnd(event: any) {
    const { over } = event;

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    setParent(over ? over.id : null);
  }
}
