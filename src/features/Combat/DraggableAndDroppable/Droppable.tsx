import { useDroppable } from "@dnd-kit/core";

interface IDroppableProps {
  children: React.ReactNode;
  droppableId?: string;
}

export function Droppable(props: IDroppableProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.droppableId ?? "droppable",
  });
  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}
