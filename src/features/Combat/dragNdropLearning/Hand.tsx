import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";

import { Draggable } from "./Draggable";
import { Droppable } from "./Droppable";

export function Hand() {
  const [isDropped, setIsDropped] = useState(false);

  // Element being moved
  const draggableMarkup = <Draggable>Drag me</Draggable>;

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {/* where we place our item to be dragged*/}
      {!isDropped ? draggableMarkup : null}
      {/* where we drop our item*/}
      <Droppable>{isDropped ? draggableMarkup : "Drop here"}</Droppable>
    </DndContext>
  );

  function handleDragEnd(event: any) {
    // When the dragged item is released
    // - IF: it is over the droppable element
    // - THEN: set the isDropped state to true
    if (event.over && event.over.id === "droppable") {
      setIsDropped(true);
    }
  }
}
