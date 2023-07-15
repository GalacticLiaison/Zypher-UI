import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Combatant } from "./Combat";
import { Spawn, Turn, TurnPhase } from "./components/TurnManager/TurnManager";
import { CombatCard } from "./CombatCards/CombatCard";
import { ISpawnCardProps, SpawnCard } from "./CombatCards/SpawnCard";
import { IReactionCardProps, ReactionCard } from "./CombatCards/ReactionCard";

export type CombatantBoardData = {
  combatantId: string;
  combatant: Combatant;
  spawnSlotLayout: Array<ISpawnCardProps>;
  reactionSlotLayout: Array<IReactionCardProps>;
};

export type BattlefieldLayout = {
  topTeamIds: Array<string>;
  bottomTeamIds: Array<string>;
};

export type BattlefieldData = {
  topTeam: Array<CombatantBoardData>;
  bottomTeam: Array<CombatantBoardData>;
};

export type Attack = {
  attacker: SpawnCard;
  position: "top" | "bottom";
};

export interface CombatState {
  isLoading: boolean;
  combatants: Combatant[];
  battlefieldLayout: BattlefieldLayout;
  battlefieldData: BattlefieldData;
  attackInProgress: boolean;
  attackQueue: Attack[];
  turnQueue: Turn[];
  currentTurn: Turn;
  currentTurnPhase: TurnPhase;
  turnPhaseIsComplete: boolean;
}

const initialState: CombatState = {
  isLoading: true,
  combatants: [],
  battlefieldLayout: {
    topTeamIds: [],
    bottomTeamIds: [],
  } as BattlefieldLayout,
  battlefieldData: {
    topTeam: [],
    bottomTeam: [],
  } as BattlefieldData,
  attackInProgress: false,
  attackQueue: [],
  turnQueue: [],
  currentTurn: {
    turnTaker: {} as Combatant,
    position: "" as "top" | "bottom",
    positionIndex: 0,
    isPlayer: true,
  },
  currentTurnPhase: "start",
  turnPhaseIsComplete: false,
};

// you can do more than just setState
// you could also "addItem"/"upDateItem"/"removeItem
// do some .filter()s

const combat = createSlice({
  name: "combat",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setBattlefieldLayout: (state, action: PayloadAction<BattlefieldLayout>) => {
      state.battlefieldLayout = action.payload;
    },
    setBattlefieldData: (state, action: PayloadAction<BattlefieldData>) => {
      state.battlefieldData = action.payload;
    },
    setAttackQueue: (state, action: PayloadAction<Attack[]>) => {
      state.attackQueue = action.payload;
    },
    setTurnQueue: (state, action: PayloadAction<Turn[]>) => {
      state.turnQueue = action.payload;
    },
    addToTurnQueue: (state, action: PayloadAction<Turn>) => {
      state.turnQueue.push(action.payload);
    },
    setCurrentTurn: (state, action: PayloadAction<Turn>) => {
      state.currentTurn = action.payload;
    },
    setCurrentTurnPhase: (state, action: PayloadAction<TurnPhase>) => {
      state.currentTurnPhase = action.payload;
    },
    setTurnPhaseIsComplete: (state, action: PayloadAction<boolean>) => {
      state.turnPhaseIsComplete = action.payload;
    },
    endTurn: (state) => {
      const nextTurn = state.turnQueue.shift()!;
      state.currentTurn = nextTurn;
      setCurrentTurn(nextTurn);
      state.turnQueue = [...state.turnQueue, state.currentTurn];
    },
    updateCombatant: (
      state,
      action: PayloadAction<{
        combatant: Combatant;
      }>
    ) => {
      const { combatant } = action.payload;
      state.combatants = state.combatants.map((c) =>
        c.id === combatant.id ? combatant : c
      );
    },
    spawnAttacks: (state, action: PayloadAction<Spawn>) => {
      console.log("spawnAttacks");
    },
    spawnsAttack: (state, action: PayloadAction<Turn | undefined>) => {
      console.log("spawnsAttack");
      const turn = action.payload ?? state.currentTurn;
      const spawns = turn.position
        ? state.battlefieldData.topTeam[turn.positionIndex]?.spawnSlotLayout
        : state.battlefieldData.bottomTeam[turn.positionIndex]?.spawnSlotLayout;

      // Try this way, but may need to assign, state = ""
      spawns.forEach((spawn) => {
        if (spawn && spawn.card) {
          spawn.card.isAttacking = true;
        }
      });

      // turn.position == "top"
      //   ? (state.battlefieldData.topTeam[turn.positionIndex].spawnSlotLayout =
      //       spawns)
      //   : (state.battlefieldData.bottomTeam[
      //       turn.positionIndex
      //     ].spawnSlotLayout = spawns);
    },
    addToAttackers: (state, action: PayloadAction<Attack | undefined>) => {
      if (!action.payload) return;
      state.attackQueue = [...state.attackQueue, action.payload];
    },
    destroyCard: (
      state,
      action: PayloadAction<{
        card: CombatCard;
        position: "top" | "bottom";
        cardType: "Spawn" | "Reaction";
      }>
    ) => {
      let card: SpawnCard | ReactionCard | undefined | null = findCard(
        state,
        action.payload.card,
        action.payload.position,
        action.payload.cardType
      );

      if (!card) return;

      card = null;
    },
    updateCard: (
      state,
      action: PayloadAction<{
        card: CombatCard;
        position: "top" | "bottom";
        cardType: "Spawn" | "Reaction";
      }>
    ) => {
      let card = findCard(
        state,
        action.payload.card,
        action.payload.position,
        action.payload.cardType
      );

      if (!card) return;

      card = action.payload.card as SpawnCard | ReactionCard;
    },
    drawCard: (state, action: PayloadAction<Combatant | undefined>) => {
      const MAX_HAND_SIZE = 7; // TODO: setting ENV variable
      const combatant =
        action.payload ?? (state.currentTurn.turnTaker as Combatant);

      if (combatant.hand.length < MAX_HAND_SIZE) {
        const card = combatant.deck.shift();
        if (card) {
          combatant.hand.push(card);
        }

        state.combatants = state.combatants.map((c) =>
          c.id === combatant.id ? combatant : c
        );
      }
    },
    playCard: (
      state,
      action: PayloadAction<{
        overBoardPosition: "top" | "bottom"; // top or bottom
        overCombatantIndex: number; // top[i], bottom[1], etc
        overSlotIndex: number; // reaction[i], spawn[1], etc
        handIndex: number; // hand[i]
      }>
    ) => {
      let combatantBoard =
        action.payload.overBoardPosition == "top"
          ? state.battlefieldData.topTeam[action.payload.overCombatantIndex]
          : state.battlefieldData.bottomTeam[action.payload.overCombatantIndex];

      if (!combatantBoard) return;

      let combatant = combatantBoard.combatant;
      const card = combatant.hand[action.payload.handIndex];

      switch (card?.type) {
        case "Spawn":
          // Place on board
          combatantBoard.spawnSlotLayout[action.payload.overSlotIndex] = {
            card: card as SpawnCard,
            position: action.payload.overBoardPosition,
          };
          // Add to turn queue
          state.turnQueue.push({
            turnTaker: {
              boardLocation: {
                position: action.payload.overBoardPosition,
                type: "spawn",
                rowIndex: action.payload.overSlotIndex,
              },
              card: card as SpawnCard,
              image: card.image,
              name: card.name,
            },
            position: action.payload.overBoardPosition,
            positionIndex: action.payload.overCombatantIndex,
            isPlayer: false,
          });
          break;
        case "Reaction":
          combatantBoard.reactionSlotLayout[action.payload.overSlotIndex] = {
            card: card as ReactionCard,
          };
          break;
        default:
          break;
      }

      removeCardFromHand(combatant.hand, action.payload.handIndex);

      function removeCardFromHand(hand: CombatCard[], handIndex: number) {
        hand.splice(handIndex, 1);
      }
    },
  },
});

const findCard = (
  state: CombatState,
  card: CombatCard,
  position: "top" | "bottom",
  cardType: "Spawn" | "Reaction"
): SpawnCard | ReactionCard | undefined => {
  const team =
    position === "top"
      ? state.battlefieldData.topTeam
      : state.battlefieldData.bottomTeam;

  let foundCard: SpawnCard | ReactionCard | undefined;
  team.forEach((combatant) => {
    const card =
      cardType === "Spawn"
        ? findCard(combatant.spawnSlotLayout)
        : findCard(combatant.reactionSlotLayout);
    if (card) {
      foundCard = card;
    }
  });

  return foundCard;

  function findCard(
    sloyLayout: Array<ISpawnCardProps> | Array<IReactionCardProps>
  ): SpawnCard | ReactionCard | undefined {
    let foundCard: SpawnCard | ReactionCard | undefined;
    sloyLayout.forEach((slot) => {
      if (slot.card?.id === card.id) {
        foundCard = slot.card;
      }
    });
    return foundCard;
  }
};

// Useful: keep this around for debugging
console.log(combat);

export const {
  setBattlefieldLayout,
  setBattlefieldData,
  setTurnQueue,
  addToTurnQueue,
  setCurrentTurn,
  setCurrentTurnPhase,
  setTurnPhaseIsComplete,
  endTurn,
  setAttackQueue,
  addToAttackers,
  destroyCard,
  updateCard,
  drawCard,
  playCard,
  spawnAttacks,
  spawnsAttack,
} = combat.actions;

export default combat.reducer;
