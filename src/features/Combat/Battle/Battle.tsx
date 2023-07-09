import { useEffect, useRef, useState } from "react";
import { Battlefield } from "./components/Battlefield/Battlefield";
import { Combatant } from "../Combat";
import { Turn, TurnPhase } from "./BattleExecutor";
import { SpawnCard } from "../CombatCards/SpawnCard";
import { ReactionCard } from "../CombatCards/ReactionCard";
import { AI_TakeTurn } from "../AI/AI";
import { SpawnSlot } from "./components/Battlefield/components/PlaySlots/SpawnCardSlots/SpawnCardSlots";
import { ReactionSlot } from "./components/Battlefield/components/PlaySlots/ReactionCardSlots/ReactionCardSlots";
import { CombatCard } from "../CombatCards/CombatCard";

export type CombatantBoardData = {
  position: "top" | "bottom";
  index: number;
  combatant: Combatant;
  spawnSlotLayout: Map<number, SpawnCard | null>;
  reactionSlotLayout: Map<number, ReactionCard | null>;
};

type spawnAttackTarget = {
  type: "spawn";
  index: number;
  spawn: SpawnCard | null;
};
type combatantAttackTarget = {
  type: "combatant";
  combatant: Combatant;
};
type AttackTarget = spawnAttackTarget | combatantAttackTarget;

export interface IBattleProps {
  topTeamCombatants: Combatant[];
  bottomTeamCombatants: Combatant[];

  currentTurn: Turn;
  turnPhase: TurnPhase;
  completeTurnPhase: (currentTurnPhase: TurnPhase) => void;
}

export const Battle = (props: IBattleProps) => {
  /*
    Responsibilities:
    - Manage State of entire battle
      - Number of Combatants
      - Spawn Slots
      - Reaction Slots
  */

  // ====================== Passed  Data ======================

  const [topTeamCombatants, setTopTeamCombatants] = useState<Combatant[]>(
    props.topTeamCombatants
  );
  const [bottomTeamCombatants, setBottomTeamCombatants] = useState<Combatant[]>(
    props.bottomTeamCombatants
  );

  useEffect(() => {
    setTopTeamCombatants(props.topTeamCombatants);
  }, [topTeamCombatants]);
  useEffect(() => {
    setBottomTeamCombatants(props.bottomTeamCombatants);
  }, [bottomTeamCombatants]);

  useEffect(() => {
    setTopTeamCombatants(props.topTeamCombatants);
  }, [props.topTeamCombatants]);
  useEffect(() => {
    setBottomTeamCombatants(props.bottomTeamCombatants);
  }, [props.bottomTeamCombatants]);

  const [currentTurn, setCurrentTurn] = useState<Turn>(props.currentTurn);
  useEffect(() => {
    setCurrentTurn(props.currentTurn);
  }, [props.currentTurn]);

  const lastPhaseRan = useRef<TurnPhase | "">("");
  const [turnPhase, setTurnPhase] = useState<TurnPhase>(props.turnPhase);
  useEffect(() => {
    setTurnPhase(props.turnPhase);
  }, [props.turnPhase]);
  useEffect(() => {
    if (lastPhaseRan.current == turnPhase) {
      return;
    }

    const executeTurn = async () => {
      switch (turnPhase) {
        case "start":
          props.completeTurnPhase(turnPhase);
          break;
        case "draw":
          drawCard();
          props.completeTurnPhase(turnPhase);
          break;
        case "play":
          if (currentTurn.isPlayer === false) {
            setTimeout(() => {
              AI_TakeTurn(
                removeCardFromHand,
                findCombatantBoard(currentTurn.combatant, currentTurn.position),
                currentTurn.combatant.hand
              );
              setTopTeam([...topTeam]);
              setBottomTeam([...bottomTeam]);
              props.completeTurnPhase(turnPhase);
            }, 2000);
          }
          // Button Press Ends Play Phase
          break;
        case "spawn":
          await spawnsAttack();
          props.completeTurnPhase(turnPhase);
          break;
        case "end":
          props.completeTurnPhase(turnPhase);
          break;
        default:
          console.error("Battle: Invalid Turn Phase");
          break;
      }
    };

    executeTurn()
      .then(() => console.log("YEE"))
      .catch(console.error);
  }, [turnPhase]);

  // ======================  Battle State Management ======================

  const startingSpawnMap = new Map<number, SpawnSlot>();
  startingSpawnMap.set(0, null);
  startingSpawnMap.set(1, null);
  startingSpawnMap.set(2, null);

  const startingReactionMap = new Map<number, ReactionSlot>();
  startingReactionMap.set(0, null);
  startingReactionMap.set(1, null);
  startingReactionMap.set(2, null);

  const mapCombatantsToBoards = (
    combatants: Combatant[],
    position: "top" | "bottom"
  ): CombatantBoardData[] => {
    return combatants.map((combatant, index) => {
      return mapCombatantToBoard(combatant, position, index);
    });
  };

  const mapCombatantToBoard = (
    combatant: Combatant,
    position: "top" | "bottom",
    index: number
  ): CombatantBoardData => {
    return {
      position: position,
      index: index,
      combatant: combatant,
      spawnSlotLayout: new Map<number, SpawnCard | null>(startingSpawnMap),
      reactionSlotLayout: new Map<number, ReactionCard | null>(
        startingReactionMap
      ),
    };
  };

  const [topTeam, setTopTeam] = useState<CombatantBoardData[]>(
    mapCombatantsToBoards(props.topTeamCombatants, "top")
  );
  const [bottomTeam, setBottomTeam] = useState<CombatantBoardData[]>(
    mapCombatantsToBoards(props.bottomTeamCombatants, "bottom")
  );

  const findCombatantBoard = (
    combatant: Combatant,
    position: "top" | "bottom"
  ): CombatantBoardData | undefined => {
    const boards = position === "top" ? topTeam : bottomTeam;
    return boards.find((boardData) => boardData.combatant === combatant);
  };

  const MAX_HAND_SIZE = 7;
  const drawCard = (drawCommand?: {
    combatant: Combatant;
    boardPosition: "top" | "bottom";
  }) => {
    if (!drawCommand) {
      drawCommand = {
        combatant: currentTurn.combatant,
        boardPosition: currentTurn.position,
      };
    }

    if (drawCommand.combatant.hand.length < MAX_HAND_SIZE) {
      const card = drawCommand.combatant.deck.shift();
      if (card) {
        drawCommand.combatant.hand.push(card);
      }
    }

    drawCommand.boardPosition === "top"
      ? setTopTeam([...topTeam])
      : setBottomTeam([...bottomTeam]);
  };

  const spawnsAttack = async () => {
    const combatantBoard =
      currentTurn.position === "top"
        ? topTeam[currentTurn.positionIndex]
        : bottomTeam[currentTurn.positionIndex];

    combatantBoard.spawnSlotLayout.forEach(async (spawn) => {
      if (spawn && spawn.type === "Spawn") {
        console.log("PRE WAIT");
        // await wait(5000);
        console.log("POST WAIT");
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
      (enemy) => (enemy as spawnAttackTarget).spawn !== null
    );
    enemies.push({
      type: "combatant",
      combatant: opponentsBoard.combatant,
    });

    console.log("ENEMIES: ", enemies);

    const seed = Math.floor(Math.random() * enemies.length);
    console.log("SEED: ", seed);

    const enemy = enemies[seed];
    attackEnemy(enemy, attackingSpawn, opponentsSlotLayout, opponentsBoard);
  };

  const attackEnemy = (
    enemy: AttackTarget,
    attackingSpawn: SpawnCard,
    opponentsSlotLayout: Map<number, SpawnSlot>,
    opponentsBoard: CombatantBoardData
  ) => {
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
      console.log(`${attackingSpawn.name} attacks ${enemy?.combatant.name}`);
      enemy.combatant.health -= attackingSpawn.attack;
    }
  };

  const nextTurnPhase = () => {
    props.completeTurnPhase(turnPhase);
  };

  return (
    <>
      <Battlefield
        topTeam={topTeam}
        bottomTeam={bottomTeam}
        drawCard={drawCard}
        nextTurnPhase={nextTurnPhase}
      ></Battlefield>
      <div>Turn: {currentTurn.combatant.name}</div>
      <div>Turn Phase: {turnPhase}</div>
    </>
  );
};

export function removeCardFromHand(hand: CombatCard[], handIndex: number) {
  hand.splice(handIndex, 1);
}
