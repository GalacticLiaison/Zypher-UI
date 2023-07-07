import Grid from "@mui/material/Grid";
import { useEffect, useRef, useState } from "react";
import { DndContext, DragStartEvent, UniqueIdentifier } from "@dnd-kit/core";
import { CombatCard } from "../CombatCards/CombatCard";
import { Button } from "@mui/material";
import { Combatant } from "../Combat";
import {
  CombatantBoard,
  ICombatantBoardProps,
} from "./components/CombatantBoard/CombatantBoard";
import { drawCard } from "./utils/battle-field-actions";
import { SpawnCard } from "../CombatCards/SpawnCard";
import { ReactionCard } from "../CombatCards/ReactionCard";
import { SpawnSlot } from "./components/PlaySlots/SpawnCardSlots/SpawnCardSlots";
import { ReactionSlot } from "./components/PlaySlots/ReactionCardSlots/ReactionCardSlots";

export interface Spawn {
  card: CombatCard | undefined;
  clickable: boolean;
  attacking: boolean;
}

export interface Reaction {
  card: CombatCard | undefined;
}

export interface IBattlefieldProps {
  topTeam: Combatant[];
  bottomTeam: Combatant[];
}

type spawnAttTarg = {
  type: "spawn";
  index: number;
  spawn: SpawnCard | null;
};
type combatantAttTarg = {
  type: "combatant";
  combatant: Combatant;
};
type AttackTarget = spawnAttTarg | combatantAttTarg;

// Playing cards costs action points (influenced by stamina, agility, maybe will)
// in addition to the card's other costs (mana, health, etc.)

export function Battlefield(props: IBattlefieldProps) {
  type Turn = {
    combatant: Combatant;
    position: "top" | "bottom";
    positionIndex: number;
    isPlayer: boolean;
  };
  const [turnQueue, setTurnQueue] = useState<Turn[]>([
    {
      combatant: props.topTeam[0],
      position: "top",
      positionIndex: 0,
      isPlayer: false,
    },
    {
      combatant: props.topTeam[1],
      position: "top",
      positionIndex: 1,
      isPlayer: false,
    },
  ]);

  const hasDrawnCard = useRef<boolean>(false);
  const [currentTurn, setCurrentTurn] = useState<Turn>({
    combatant: props.bottomTeam[0],
    position: "bottom",
    positionIndex: 0,
    isPlayer: true,
  });
  useEffect(() => {
    if (hasDrawnCard.current) return;
    beginTurn();
    hasDrawnCard.current = true;
  }, [currentTurn]);

  type turnPhase = "draw" | "play" | "spawn" | "end";
  const [turnPhase, setTurnPhase] = useState<turnPhase>("draw");

  const handleDrawCard = () => {
    drawCard(currentTurn.combatant);

    setBottomTeam([...bottomTeam]);
    setTopTeam([...topTeam]);
  };

  const beginTurn = () => {
    setTurnPhase("draw");
    handleDrawCard();
    setTurnPhase("play");
    if (currentTurn.isPlayer) return;
    setTimeout(() => {
      runAiTurn();
    }, 2000);
  };

  const runAiTurn = () => {
    const combatantBoard =
      currentTurn.position === "top"
        ? topTeam[currentTurn.positionIndex]
        : bottomTeam[currentTurn.positionIndex];
    const hand = currentTurn.combatant.hand;
    const spawn = hand.find((card) => card.type === "Spawn");

    if (spawn) {
      const spawnSlotLayout = new Map(combatantBoard.spawnSlotLayout);

      if (spawnSlotLayout.get(0)) return;

      spawnSlotLayout.set(0, spawn as SpawnCard);
      combatantBoard.spawnSlotLayout = spawnSlotLayout;
    }

    finishActionPhase();
  };

  // End Action Phase Button Press
  const finishActionPhase = () => {
    beginSpawnPhase();
  };

  const beginSpawnPhase = () => {
    setTurnPhase("spawn");
    spawnsAttack();
    endTurn();
  };

  const spawnsAttack = () => {
    const combatantBoard =
      currentTurn.position === "top"
        ? topTeam[currentTurn.positionIndex]
        : bottomTeam[currentTurn.positionIndex];

    combatantBoard.spawnSlotLayout.forEach((spawn) => {
      if (spawn && spawn.type === "Spawn") {
        attackRandomEnemy(spawn);
      }
    });
  };

  const attackRandomEnemy = (attackingSpawn: SpawnCard) => {
    const opponentsTeam = currentTurn.position === "top" ? bottomTeam : topTeam;
    const opponentsBoard =
      opponentsTeam[Math.floor(Math.random() * opponentsTeam.length)];
    const opponentsSlotLayout = new Map(opponentsBoard.spawnSlotLayout);

    const attackTargets: AttackTarget[] = [];
    for (let index = 0; index < opponentsSlotLayout.size; index++) {
      const spawn = opponentsSlotLayout.get(index);
      attackTargets.push({
        type: "spawn",
        index: index,
        spawn: spawn ? spawn : null,
      });
    }

    const enemies = attackTargets.filter(
      (enemy) => (enemy as spawnAttTarg).spawn !== null
    );
    enemies.push({
      type: "combatant",
      combatant: opponentsBoard.combatant,
    });

    const enemy = enemies[Math.floor(Math.random() * enemies.length)];
    attackEnemy(enemy, attackingSpawn, opponentsSlotLayout, opponentsBoard);
  };

  function attackEnemy(
    enemy: AttackTarget,
    attackingSpawn: SpawnCard,
    opponentsSlotLayout: Map<number, SpawnSlot>,
    opponentsBoard: ICombatantBoardProps
  ) {
    if (enemy && enemy.type === "spawn" && enemy.spawn) {
      console.log(`${attackingSpawn.name} attacks ${enemy?.spawn?.name}`);
      enemy.spawn.health -= attackingSpawn.attack;
      if (enemy.spawn.health <= 0) {
        opponentsSlotLayout.set(enemy.index, null);
      } else {
        opponentsSlotLayout.set(enemy.index, enemy.spawn);
      }

      opponentsBoard.spawnSlotLayout = opponentsSlotLayout;
    }
    if (enemy && enemy.type === "combatant") {
      enemy.combatant.health -= attackingSpawn.attack;
    }
  }

  const endTurn = () => {
    setTurnPhase("end");
    const nextTurn = turnQueue.shift()!;
    setTurnQueue([...turnQueue, currentTurn]);
    hasDrawnCard.current = false;
    setCurrentTurn(nextTurn);
  };

  const [selectedCard, setSelectedCard] = useState<CombatCard | undefined>();
  const [targetCard, setTargetCard] = useState<CombatCard | undefined>();
  const resolveCardInteraction = () => {
    if (selectedCard == undefined || targetCard == undefined) return;
  };
  useEffect(() => {
    if (targetCard == undefined) return;
    resolveCardInteraction();
  }, [targetCard]);

  const handleCardClick = (card: any) => {
    if (!selectedCard) {
      setSelectedCard(card);
    } else if (!targetCard) {
      setTargetCard(card);
    }
  };

  const startingSpawnMap = new Map<number, SpawnSlot>();
  startingSpawnMap.set(0, null);
  startingSpawnMap.set(1, null);
  startingSpawnMap.set(2, null);

  const startingReactionMap = new Map<number, ReactionSlot>();
  startingReactionMap.set(0, null);
  startingReactionMap.set(1, null);
  startingReactionMap.set(2, null);

  const [topTeam, setTopTeam] = useState<ICombatantBoardProps[]>(
    props.topTeam.map((combatant, index) => {
      return {
        position: "top",
        index: index,
        combatant: combatant,
        spawnSlotLayout: new Map<number, SpawnCard | null>(startingSpawnMap),
        reactionSlotLayout: new Map<number, ReactionCard | null>(
          startingReactionMap
        ),
        handleCardClick: handleCardClick,
      };
    })
  );
  const [bottomTeam, setBottomTeam] = useState<ICombatantBoardProps[]>(
    props.bottomTeam.map((combatant, index) => {
      return {
        position: "bottom",
        index: index,
        combatant: combatant,
        spawnSlotLayout: new Map<number, SpawnCard | null>(startingSpawnMap),
        reactionSlotLayout: new Map<number, ReactionCard | null>(
          startingReactionMap
        ),
        handleCardClick: handleCardClick,
      };
    })
  );

  const [draggedCardId, setDraggedCardId] = useState<
    UniqueIdentifier | undefined
  >();

  return (
    <div>
      <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div style={{ height: 100, backgroundColor: "lightskyblue" }}></div>
          </Grid>
          <Grid container item xs={12} spacing={2}>
            {topTeam.map((combatant) => (
              <CombatantBoard
                key={combatant.index}
                position={combatant.position}
                index={combatant.index}
                columns={12 / props.topTeam.length}
                combatant={combatant.combatant}
                spawnSlotLayout={combatant.spawnSlotLayout}
                reactionSlotLayout={combatant.reactionSlotLayout}
                handleCardClick={handleCardClick}
              ></CombatantBoard>
            ))}
          </Grid>
          <Grid container item xs={12} spacing={2}>
            {bottomTeam.map((combatant) => (
              <CombatantBoard
                key={combatant.index}
                position={combatant.position}
                index={combatant.index}
                columns={12 / props.bottomTeam.length}
                combatant={combatant.combatant}
                spawnSlotLayout={combatant.spawnSlotLayout}
                reactionSlotLayout={combatant.reactionSlotLayout}
                handleCardClick={handleCardClick}
              ></CombatantBoard>
            ))}
          </Grid>
          <Grid item xs={12}>
            <div style={{ height: 100, backgroundColor: "lightskyblue" }}>
              <Button
                onClick={finishActionPhase}
                variant="contained"
                color="success"
              >
                End Action Phase
              </Button>
              <Button onClick={handleDrawCard} variant="contained">
                Draw
              </Button>
            </div>
          </Grid>
        </Grid>
      </DndContext>
    </div>
  );

  function handleDragStart(event: DragStartEvent) {
    setDraggedCardId(event?.active?.id);
  }

  function handleDragEnd(event: any) {
    const { over } = event;

    if (over) {
      const [
        overBoardPosition,
        overCombatantIndex,
        overSlotType,
        overSlotIndex,
      ] = over.id.split("-");

      const [
        draggedBoardPosition,
        draggedCombatantIndex,
        draggedCardPosition,
        handIndexString,
      ] = (draggedCardId as string).split("-");

      console.table({
        overBoardPosition,
        overCombatantIndex,
        overSlotType,
        overSlotIndex,
        draggedBoardPosition,
        draggedCombatantIndex,
        draggedCardPosition,
        handIndexString,
      });

      if (overBoardPosition != "top" && overBoardPosition != "bottom") return;

      const sameBoardPosition = overBoardPosition == draggedBoardPosition;
      const sameCombatant = overCombatantIndex == draggedCombatantIndex;
      if (sameBoardPosition && sameCombatant) {
        playCard();
      }

      function playCard() {
        let combatantBoard =
          overBoardPosition == "top"
            ? topTeam[overCombatantIndex]
            : bottomTeam[overCombatantIndex];
        let combatant = combatantBoard.combatant;
        const handIndex = parseInt(handIndexString);

        //#region Developer Note: On Using a Map as a React State
        /*
        Immutable Updates: React relies on immutable data updates to detect changes in props 
        or state. It means that you should avoid directly mutating the existing Map object 
        and instead create a new Map object with the desired changes. 
        This ensures that React detects the change and triggers a re-render.
        
        Shallow Equality Check: React performs a shallow equality check to determine 
        if the props have changed. When you use a Map as a prop, React checks if the 
        reference to the Map object has changed, not its internal content. 
        So if you modify the content of the Map using the set() method, 
        the reference to the Map object remains the same, and React may not detect the change.
        */
        //#endregion
        const card = combatant.hand[handIndex];
        switch (card?.type) {
          case "Spawn":
            const spawnSlotLayout = new Map(combatantBoard.spawnSlotLayout);
            spawnSlotLayout.set(parseInt(overSlotIndex), card as SpawnCard);
            combatantBoard.spawnSlotLayout = spawnSlotLayout;
            break;
          case "Reaction":
            const reactionSlotLayout = new Map(
              combatantBoard.reactionSlotLayout
            );
            reactionSlotLayout.set(
              parseInt(overSlotIndex),
              card as ReactionCard
            );
            combatantBoard.reactionSlotLayout = reactionSlotLayout;
            break;
          default:
            break;
        }

        removeCardFromHand(combatant.hand, handIndex);

        overBoardPosition == "top"
          ? setTopTeam([...topTeam])
          : setBottomTeam([...bottomTeam]);
      }
    }
  }

  function removeCardFromHand(hand: CombatCard[], handIndex: number) {
    hand.splice(handIndex, 1);
  }
}
