import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { DndContext, DragStartEvent, UniqueIdentifier } from "@dnd-kit/core";
import { CombatCard } from "../CombatCards/CombatCard";
import { Button } from "@mui/material";
import { Combatant } from "../Combat";
import {
  CombatantBoard,
  ICombatantBoardProps,
} from "./components/CombatantBoard/CombatantBoard";

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
  // TURNS
  // - Next player pulled from the turn queue
  const [turnQueue, setTurnQueue] = useState<Combatant[]>([
    props.bottomTeam[0],
    props.topTeam[0],
    props.topTeam[1],
  ]);

  const [currentCombatantsTurn, setCurrentCombatantsTurn] = useState<Combatant>(
    props.bottomTeam[0]
  );
  // const [nextTurn, setNextTurn] = useState<string>("enemy");
  // const [turnCount, setTurnCount] = useState<number>(0);

  type turnPhase = "draw" | "play" | "spawn" | "end";
  const [turnPhase, setTurnPhase] = useState<turnPhase>("draw");

  // - Turn phases
  //   - Draw
  //   - Play/Attack
  //   - End

  const drawCard = () => {
    // if (playerHand.length < 5) {

    console.log("draw card");
    const card = currentCombatantsTurn.deck.shift();
    console.log("card", card);
    if (card) {
      currentCombatantsTurn.hand.push(card);
    }

    setCurrentCombatantsTurn(currentCombatantsTurn);
    setBottomTeam([...bottomTeam]);
    setTopTeam([...topTeam]);
    setTurnPhase("play");
    // }
  };

  const endTurn = () => {
    const nextTurn = turnQueue.shift()!;
    setCurrentCombatantsTurn(nextTurn);
    setTurnQueue([...turnQueue, currentCombatantsTurn]);
    setTurnPhase("draw");
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
        isTurn: false,
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
        isTurn: false,
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
        <Grid container>
          <Grid item xs={12}>
            <div style={{ height: 100, backgroundColor: "lightskyblue" }}></div>
          </Grid>
          <Grid container item xs={12} spacing={2}>
            {topTeam.map((combatant) => (
              <CombatantBoard
                key={combatant.index}
                isTurn={false}
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
                isTurn={false}
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
              <Button onClick={endTurn}>End Turn</Button>
              <Button onClick={drawCard} variant="contained">
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
