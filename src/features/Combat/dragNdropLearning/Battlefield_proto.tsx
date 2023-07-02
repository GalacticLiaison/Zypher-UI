import Grid from "@mui/material/Grid";
import { useState } from "react";
import { PlaySlot } from "../Battlefield/components/PlaySlot";
import { Hand_proto } from "./Hand_proto";
import { DndContext, DragStartEvent } from "@dnd-kit/core";
import { CombatCard } from "../CombatCards/CombatCard";
import { Draggable } from "./Draggable";
import { ReactionCardSlots } from "./Battlefield_proto_components/ReactionCardSlots/ReactionCardSlots";
import { SpawnCardSlots } from "./Battlefield_proto_components/SpawnCardSlots/SpawnCardSlots";

interface IBattlefieldProps {}

export function Battlefield_proto() {
  const [enemyHand, setEnemyHand] = useState<CombatCard[]>([
    {
      id: 123,
      name: "Laser Blast",
      description: "Fire everything!",
      cost: 1,
      type: "Action",
      subtype: "Test",
      rarity: "Common",
      image: "src/assets/cards/laserBlast.png",
    },
    {
      id: 456,
      name: "Force Field",
      description: "Da Bubble",
      cost: 1,
      type: "Reaction",
      subtype: "Test",
      rarity: "Common",
      image: "src/assets/cards/forceField.png",
    },
    {
      id: 789,
      name: "Deployable Auto Turret",
      description: "Relax, Its got this",
      cost: 1,
      type: "Spawn",
      subtype: "Test",
      rarity: "Common",
      image: "src/assets/cards/deployableAutoTurret.png",
    },
  ]);

  const [enemySpawn1, setEnemySpawn1] = useState<CombatCard | undefined>();
  const [enemySpawn2, setEnemySpawn2] = useState<CombatCard | undefined>();
  const [enemySpawn3, setEnemySpawn3] = useState<CombatCard | undefined>();
  const [enemyReaction1, setEnemyReaction1] = useState<
    CombatCard | undefined
  >();
  const [enemyReaction2, setEnemyReaction2] = useState<
    CombatCard | undefined
  >();
  const [enemyReaction3, setEnemyReaction3] = useState<
    CombatCard | undefined
  >();

  const [playerHand, setPlayerHand] = useState<CombatCard[]>([
    {
      id: 123,
      name: "Laser Blast",
      description: "Fire everything!",
      cost: 1,
      type: "Action",
      subtype: "Test",
      rarity: "Common",
      image: "src/assets/cards/laserBlast.png",
    },
    {
      id: 456,
      name: "Force Field",
      description: "Da Bubble",
      cost: 1,
      type: "Reaction",
      subtype: "Test",
      rarity: "Common",
      image: "src/assets/cards/forceField.png",
    },
    {
      id: 789,
      name: "Deployable Auto Turret",
      description: "Relax, Its got this",
      cost: 1,
      type: "Spawn",
      subtype: "Test",
      rarity: "Common",
      image: "src/assets/cards/deployableAutoTurret.png",
    },
  ]);

  const [playerSpawn1, setPlayerSpawn1] = useState<CombatCard | undefined>();
  const [playerSpawn2, setPlayerSpawn2] = useState<CombatCard | undefined>();
  const [playerSpawn3, setPlayerSpawn3] = useState<CombatCard | undefined>();
  const [playerReaction1, setPlayerReaction1] = useState<
    CombatCard | undefined
  >();
  const [playerReaction2, setPlayerReaction2] = useState<
    CombatCard | undefined
  >();
  const [playerReaction3, setPlayerReaction3] = useState<
    CombatCard | undefined
  >();

  const [draggedCardId, setDraggedCardId] = useState<number>(0);

  return (
    <div>
      <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        <Grid container spacing={3}>
          <Grid id="enemyReactions" item xs={12}>
            {/* Enemy Reactions */}
            <ReactionCardSlots
              slot1Card={enemyReaction1}
              slot2Card={enemyReaction2}
              slot3Card={enemyReaction3}
              droppableIdPrefix="enemyReaction"
            ></ReactionCardSlots>
          </Grid>
          <Grid id="enemySpawns" item xs={12}>
            {/* Enemy Spawns */}
            <SpawnCardSlots
              slot1Card={enemySpawn1}
              slot2Card={enemySpawn2}
              slot3Card={enemySpawn3}
              droppableIdPrefix="enemySpawn"
            ></SpawnCardSlots>
          </Grid>
          <Grid id="playerSpawns" item xs={12}>
            {/* Player Spawns */}
            <SpawnCardSlots
              slot1Card={playerSpawn1}
              slot2Card={playerSpawn2}
              slot3Card={playerSpawn3}
              droppableIdPrefix="playerSpawn"
            ></SpawnCardSlots>
          </Grid>
          <Grid id="playerReactions" item xs={12}>
            {/* Player Reactions */}
            <ReactionCardSlots
              slot1Card={playerReaction1}
              slot2Card={playerReaction2}
              slot3Card={playerReaction3}
              droppableIdPrefix="playerReaction"
            ></ReactionCardSlots>
          </Grid>
          <Grid id="playerHand" item xs={12}>
            {/* Player Hand */}
            <Hand_proto cards={playerHand}></Hand_proto>
          </Grid>
          <Grid id="PlayerPortrait" item xs={12}>
            {/* Player Portrait */}
            <Grid container>
              <Grid item xs={5}></Grid>
              <Grid item xs={2}>
                <PlaySlot></PlaySlot>
              </Grid>
              <Grid item xs={5}></Grid>
            </Grid>
          </Grid>
        </Grid>
      </DndContext>
    </div>
  );

  function handleDragStart(event: DragStartEvent) {
    console.log("Drag Start", event);
    setDraggedCardId(parseInt(event?.active?.id as string));
  }

  function handleDragEnd(event: any) {
    const { over } = event;

    console.log("over: ", over);

    if (over.id == "playerSpawn1") {
      const card = playerHand.find((card) => card.id == draggedCardId);
      if (card?.type == "Spawn") {
        setPlayerSpawn1(card);
        setPlayerHand(playerHand.filter((card) => card.id != draggedCardId));
      }
    }
    if (over.id == "playerSpawn2") {
      const card = playerHand.find((card) => card.id == draggedCardId);
      if (card?.type == "Spawn") {
        setPlayerSpawn2(card);
        setPlayerHand(playerHand.filter((card) => card.id != draggedCardId));
      }
    }
    if (over.id == "playerSpawn3") {
      const card = playerHand.find((card) => card.id == draggedCardId);
      if (card?.type == "Spawn") {
        setPlayerSpawn3(card);
        setPlayerHand(playerHand.filter((card) => card.id != draggedCardId));
      }
    }
    if (over.id == "playerReaction1") {
      const card = playerHand.find((card) => card.id == draggedCardId);
      if (card?.type == "Reaction") {
        setPlayerReaction1(card);
        setPlayerHand(playerHand.filter((card) => card.id != draggedCardId));
      }
    }
    if (over.id == "playerReaction2") {
      const card = playerHand.find((card) => card.id == draggedCardId);
      if (card?.type == "Reaction") {
        setPlayerReaction2(card);
        setPlayerHand(playerHand.filter((card) => card.id != draggedCardId));
      }
    }
    if (over.id == "playerReaction3") {
      const card = playerHand.find((card) => card.id == draggedCardId);
      if (card?.type == "Reaction") {
        setPlayerReaction3(card);
        setPlayerHand(playerHand.filter((card) => card.id != draggedCardId));
      }
    }
  }
}
