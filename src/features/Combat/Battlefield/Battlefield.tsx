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

export interface Spawn {
  card: CombatCard | undefined;
  clickable: boolean;
  attacking: boolean;
}

export interface Reaction {
  card: CombatCard | undefined;
}

// Combatant
// export interface Combatant {
//   name: string;
//   health: number;
//   hand: CombatCard[];
//   deck: CombatCard[];
//   board: {
//     spawn1: Spawn;
//     spawn2: Spawn;
//     spawn3: Spawn;
//     reaction1: Reaction;
//     reaction2: Reaction;
//     reaction3: Reaction;
//   };
// }

export interface IBattlefieldProps {
  topTeam: Combatant[];
  bottomTeam: Combatant[];
}

export function Battlefield(props: IBattlefieldProps) {
  type Turn = {
    combatant: Combatant;
    position: "top" | "bottom";
    index: number;
    isPlayer: boolean;
  };
  const [turnQueue, setTurnQueue] = useState<Turn[]>([
    { combatant: props.topTeam[0], position: "top", index: 0, isPlayer: false },
    { combatant: props.topTeam[1], position: "top", index: 1, isPlayer: false },
  ]);
  useEffect(() => {
    if (turnQueue) console.log("turnQueue: ", turnQueue);
  }, [turnQueue]);

  const hasDrawnCard = useRef<boolean>(false);
  const [currentTurn, setCurrentTurn] = useState<Turn>({
    combatant: props.bottomTeam[0],
    position: "bottom",
    index: 0,
    isPlayer: true,
  });
  useEffect(() => {
    console.log("currentTurn: ", currentTurn);
    console.log("hasDrawnCard: ", hasDrawnCard);
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
    console.log("running ai turn");
    const combatantBoard =
      currentTurn.position === "top"
        ? topTeam[currentTurn.index]
        : bottomTeam[currentTurn.index];
    const hand = currentTurn.combatant.hand;
    const spawn = hand.find((card) => card.type === "Spawn");
    if (spawn) {
      combatantBoard.spawn1Slot = spawn;
    }
    finishActionPhase();
  };

  // End Action Phase Button Press
  const finishActionPhase = () => {
    beginSpawnPhase();
  };

  const beginSpawnPhase = () => {
    setTurnPhase("spawn");
    endTurn();
  };

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

  const [topTeam, setTopTeam] = useState<ICombatantBoardProps[]>(
    props.topTeam.map((combatant, index) => {
      return {
        position: "top",
        index: index,
        combatant: combatant,
        spawn1Slot: undefined,
        spawn2Slot: undefined,
        spawn3Slot: undefined,
        reaction1Slot: undefined,
        reaction2Slot: undefined,
        reaction3Slot: undefined,
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
        spawn1Slot: undefined,
        spawn2Slot: undefined,
        spawn3Slot: undefined,
        reaction1Slot: undefined,
        reaction2Slot: undefined,
        reaction3Slot: undefined,
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
                spawn1Slot={combatant.spawn1Slot}
                spawn2Slot={combatant.spawn2Slot}
                spawn3Slot={combatant.spawn3Slot}
                reaction1Slot={combatant.reaction1Slot}
                reaction2Slot={combatant.reaction2Slot}
                reaction3Slot={combatant.reaction3Slot}
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
                spawn1Slot={combatant.spawn1Slot}
                spawn2Slot={combatant.spawn2Slot}
                spawn3Slot={combatant.spawn3Slot}
                reaction1Slot={combatant.reaction1Slot}
                reaction2Slot={combatant.reaction2Slot}
                reaction3Slot={combatant.reaction3Slot}
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
    console.log("Drag Start", event);
    setDraggedCardId(event?.active?.id);
  }

  function handleDragEnd(event: any) {
    const { over } = event;
    console.log("over: ", over);

    if (over) {
      const [overBoardPosition, overCombatantIndex, overCardPosition] =
        over.id.split("-");

      const [
        draggedBoardPosition,
        draggedCombatantIndex,
        draggedCardPosition,
        handIndexString,
      ] = (draggedCardId as string).split("-");

      console.table({
        overBoardPosition,
        overCombatantIndex,
        overCardPosition,
        draggedBoardPosition,
        draggedCombatantIndex,
        draggedCardPosition,
        handIndexString,
      });

      const sameBoardPosition = overBoardPosition == draggedBoardPosition;
      const sameCombatant = overCombatantIndex == draggedCombatantIndex;
      if (sameBoardPosition && sameCombatant) {
        let boardPosition;
        switch (overBoardPosition) {
          case "top":
            boardPosition = "top";
            break;
          case "bottom":
            boardPosition = "bottom";
            break;
          default:
            throw new Error("Invalid board position");
        }

        let combatantBoard =
          boardPosition == "top"
            ? topTeam[overCombatantIndex]
            : bottomTeam[overCombatantIndex];
        let combatant = combatantBoard.combatant;
        const handIndex = parseInt(handIndexString);

        const card = combatant.hand[handIndex];
        if (card?.type == "Spawn") {
          switch (overCardPosition) {
            case "spawn1":
              combatantBoard.spawn1Slot = card;
              removeCardFromHand(combatant.hand, handIndex);
              break;
            case "spawn2":
              combatantBoard.spawn2Slot = card;
              removeCardFromHand(combatant.hand, handIndex);
              break;
            case "spawn3":
              combatantBoard.spawn3Slot = card;
              removeCardFromHand(combatant.hand, handIndex);
              break;
            default:
              break;
          }
        }

        if (card?.type == "Reaction") {
          switch (overCardPosition) {
            case "reaction1":
              combatantBoard.reaction1Slot = card;
              removeCardFromHand(combatant.hand, handIndex);
              break;
            case "reaction2":
              combatantBoard.reaction2Slot = card;
              removeCardFromHand(combatant.hand, handIndex);
              break;
            case "reaction3":
              combatantBoard.reaction3Slot = card;
              removeCardFromHand(combatant.hand, handIndex);
              break;
            default:
              break;
          }
        }

        overBoardPosition == "top"
          ? setTopTeam([...topTeam])
          : setBottomTeam([...bottomTeam]);
      }

      function removeCardFromHand(hand: CombatCard[], handIndex: number) {
        hand.splice(handIndex, 1);
      }
    }
  }
}
