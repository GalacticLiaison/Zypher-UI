import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { DndContext, DragStartEvent, UniqueIdentifier } from "@dnd-kit/core";
import { CombatCard } from "../../../CombatCards/CombatCard";
import { Button } from "@mui/material";
import { CombatantBoard } from "./components/CombatantBoard/CombatantBoard";
import { useDispatch, useSelector } from "react-redux";
import {
  CombatState,
  CombatantBoardData,
  drawCard,
  playCard,
  setTurnPhaseIsComplete,
} from "../../../combatSlice";

export interface Reaction {
  card: CombatCard | undefined;
}

export interface IBattlefieldProps {
  // topTeam: CombatantBoardData[];
  // bottomTeam: CombatantBoardData[];
  // nextTurnPhase: () => void;
  // drawCard: () => void;
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

  // Start Here:
  // - so down stream the playslots are getting set then overwritten,
  //     - since they have an empty array store state im guessing thats whats going on, its immediately overwriting
  // - Ideas:
  //   - Could use the initial state to set minimum slots instead of empty arrays
  //   - Refactor: make literally everything use state, dont get cute with props/useContext
  //   - and really ask your self if you need all the data you are pulling in,
  //     alot of components you could probably just pass an id down and fetch state when needed

  const { battlefieldLayout } = useSelector(
    (store: any) => store.combat
  ) as CombatState;

  const [topTeamIds, setTopTeamIds] = useState<Array<string>>(
    battlefieldLayout.topTeamIds
  );
  const [bottomTeamIds, setBottomTeamIds] = useState<Array<string>>(
    battlefieldLayout.bottomTeamIds
  );

  useEffect(() => {
    setTopTeamIds(battlefieldLayout.topTeamIds);
    setBottomTeamIds(battlefieldLayout.bottomTeamIds);
  }, [battlefieldLayout]);

  // const drawCard = () => {
  //   props.drawCard();
  // };

  const dispatch = useDispatch();

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
          {topTeamIds.map((id, index) => {
            return (
              <CombatantBoard
                key={index}
                index={index}
                combatantId={id}
                position={"top"}
                // columns={12 / topTeamIds.length}
                // board={board}
                handleCardClick={handleCardClick}
              ></CombatantBoard>
            );
          })}
        </Grid>
        <Grid container item xs={12} spacing={2}>
          {bottomTeamIds.map((id, index) => {
            return (
              <CombatantBoard
                key={index}
                index={index}
                combatantId={id}
                position={"bottom"}
                // columns={12 / bottomTeam.length}
                // board={board}
                handleCardClick={handleCardClick}
              ></CombatantBoard>
            );
          })}
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={() => dispatch(setTurnPhaseIsComplete(true))}
            variant="contained"
            color="success"
          >
            End Action Phase
          </Button>
          <Button onClick={() => dispatch(drawCard())} variant="contained">
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
        overSlotIndex, // reaction[0[], reaction[1], etc
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
        dispatch(
          playCard({
            overBoardPosition,
            overCombatantIndex,
            overSlotIndex,
            handIndex: parseInt(handIndexString),
          })
        );
      }
    }
  }
}
