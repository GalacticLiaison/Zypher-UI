import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Combatant } from "./Combat";
import { Turn, TurnPhase } from "./components/TurnManager/TurnManager";
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

export interface CombatState {
  isLoading: boolean;
  combatants: Combatant[];
  battlefieldLayout: BattlefieldLayout;
  battlefieldData: BattlefieldData;
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
  turnQueue: [],
  currentTurn: {
    combatant: {} as Combatant,
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
    setTurnQueue: (state, action: PayloadAction<Turn[]>) => {
      state.turnQueue = action.payload;
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
    drawCard: (state, action: PayloadAction<Combatant | undefined>) => {
      const MAX_HAND_SIZE = 7; // TODO: setting ENV variable
      const combatant = action.payload ?? state.currentTurn.combatant;

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
    spawnsAttack: (state, action: PayloadAction<Turn | undefined>) => {
      const turn = action.payload ?? state.currentTurn;
      const spawns = turn.position
        ? state.battlefieldData.topTeam[turn.positionIndex]?.spawnSlotLayout
        : state.battlefieldData.bottomTeam[turn.positionIndex]?.spawnSlotLayout;

      // Try this way, but may need to assign, state = ""
      if (spawns) {
        spawns.forEach((spawn) => {
          if (spawn) {
            spawn.isAttacking = true;
          }
        });
      }
    },
    // attack: (state, action: PayloadAction<Turn | undefined>) => {
    //   const turn = action.payload ?? state.currentTurn;
    //   const spawns = turn.position
    //     ? state.battleField.topTeam[turn.positionIndex]?.spawnSlotLayout
    //     : state.battleField.bottomTeam[turn.positionIndex]?.spawnSlotLayout;

    //   // Try this way, but may need to assign, state = ""
    //   if (spawns) {
    //     spawns.forEach((spawn) => {
    //       if (spawn) {
    //         spawn.attacking = true;
    //       }
    //     });
    //   }
    // },
    playCard: (
      state,
      action: PayloadAction<{
        overBoardPosition: "top" | "bottom"; // top or bottom
        overCombatantIndex: number; // top[0], bottom[1], etc
        overSlotIndex: number; // reaction[0], spawn[1], etc
        handIndex: number; // hand[0]
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
          combatantBoard.spawnSlotLayout[action.payload.overSlotIndex] = {
            card: card as SpawnCard,
            isAttacking: false,
          };
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

// Useful: keep this around for debugging
console.log(combat);

export const {
  setBattlefieldLayout,
  setBattlefieldData,
  setTurnQueue,
  setCurrentTurn,
  setCurrentTurnPhase,
  setTurnPhaseIsComplete,
  endTurn,
  drawCard,
  playCard,
  spawnsAttack,
} = combat.actions;

export default combat.reducer;
