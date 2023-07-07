import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { DndContext, DragStartEvent, UniqueIdentifier } from "@dnd-kit/core";
import { CombatCard } from "../../../CombatCards/CombatCard";
import { Button } from "@mui/material";
import { SpawnCard } from "../../../CombatCards/SpawnCard";
import { ReactionCard } from "../../../CombatCards/ReactionCard";
import { CombatantBoardData } from "../../Battle";
import { CombatantBoard } from "./components/CombatantBoard/CombatantBoard";

export interface Spawn {
  card: CombatCard | undefined;
  clickable: boolean;
  attacking: boolean;
}

export interface Reaction {
  card: CombatCard | undefined;
}

export interface IBattlefieldProps {
  topTeam: CombatantBoardData[];
  bottomTeam: CombatantBoardData[];

  nextTurnPhase: () => void;
  drawCard: () => void;
}

// Playing cards costs action points (influenced by stamina, agility, maybe will)
// in addition to the card's other costs (mana, health, etc.)

export function Battlefield(props: IBattlefieldProps) {
  /*
    Responsibilities:
    - Instantiates and act as controller for all Combatant Boards
    - manages drag and drop of cards
  */

  // ====================== Passed  Data ======================

  const [topTeam, setTopTeam] = useState<CombatantBoardData[]>(props.topTeam);
  const [bottomTeam, setBottomTeam] = useState<CombatantBoardData[]>(
    props.bottomTeam
  );

  const drawCard = () => {
    props.drawCard();
  };

  // ====================== Drag and Drop ======================

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

  const [draggedCardId, setDraggedCardId] = useState<
    UniqueIdentifier | undefined
  >();

  return (
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
          <Button
            onClick={props.nextTurnPhase}
            variant="contained"
            color="success"
          >
            End Action Phase
          </Button>
          <Button onClick={drawCard} variant="contained">
            Draw
          </Button>
        </Grid>
      </Grid>
    </DndContext>
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
