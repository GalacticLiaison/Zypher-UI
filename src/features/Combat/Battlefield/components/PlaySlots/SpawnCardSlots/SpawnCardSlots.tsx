import { IPlaySlotStyleTemplate } from "../components/PlaySlot/PlaySlot";
import { SpawnCard } from "../../../../CombatCards/SpawnCard";
import { useEffect, useState } from "react";
import { PlaySlots } from "../PlaySlots";

export type SpawnSlot = SpawnCard | null;

export interface ISpawnCardSlotsProps {
  slotLayout: Map<number, SpawnSlot>;
  droppableIdPrefix: string;
}

export function SpawnCardSlots(props: ISpawnCardSlotsProps) {
  const styleTemplate: IPlaySlotStyleTemplate = {
    backgroundColor: "lightgreen",
  };

  const [slotLayout, setSlotLayout] = useState<Map<number, SpawnSlot>>(
    props.slotLayout
  );
  useEffect(() => {
    setSlotLayout(new Map(props.slotLayout));
  }, [props.slotLayout]);

  return (
    <PlaySlots
      slots={slotLayout}
      droppableIdPrefix={props.droppableIdPrefix}
      styleTemplate={styleTemplate}
      id="Spawns"
    ></PlaySlots>
  );
}
