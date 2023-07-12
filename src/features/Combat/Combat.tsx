import { CombatCard } from "./CombatCards/CombatCard";
import { SpawnCard } from "./CombatCards/SpawnCard";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  CombatantBoardData,
  setBattlefieldData,
  setBattlefieldLayout,
  setCurrentTurn,
  setTurnQueue,
} from "./combatSlice";
import { Turn, TurnManager } from "./components/TurnManager/TurnManager";
import { Battle } from "./Battle/Battle";
import { SpawnSlot } from "./Battle/components/Battlefield/components/PlaySlots/SpawnCardSlots/SpawnCardSlots";
import { ReactionSlot } from "./Battle/components/Battlefield/components/PlaySlots/ReactionCardSlots/ReactionCardSlots";
import { Battlefield } from "./Battle/components/Battlefield/Battlefield";

export interface Combatant {
  id: string;
  name: string;
  health: number;
  hand: (CombatCard | SpawnCard)[];
  deck: (CombatCard | SpawnCard)[];
}

export const MINIMUM_SLOTS = 3;

export const Combat = () => {
  /*
    Responsibilities:
    - Entrance to the Combat Feature
    - Fetches Data (combatants, cards, etc)
    - Initializes Battle
  */

  const laserBlast: CombatCard = {
    id: 123,
    name: "Laser Blast",
    description: "Fire everything!",
    cost: 1,
    type: "Action",
    subtype: "Test",
    rarity: "Common",
    image: "src/assets/cards/laserBlast.png",
  };

  const forceField: CombatCard = {
    id: 456,
    name: "Force Field",
    description: "Da Bubble",
    cost: 1,
    type: "Reaction",
    subtype: "Test",
    rarity: "Common",
    image: "src/assets/cards/forceField.png",
  };

  const deployableAutoTurret: SpawnCard = {
    id: 789,
    name: "Deployable Auto Turret",
    description: "Relax, Its got this",
    cost: 1,
    type: "Spawn",
    subtype: "Test",
    rarity: "Common",
    image: "src/assets/cards/deployableAutoTurret.png",
    attack: 1,
    health: 2,
    totalHealth: 2,
  };

  const wolf: SpawnCard = {
    id: 789,
    name: "Space Wolf",
    description: "doggo in space",
    cost: 1,
    type: "Spawn",
    subtype: "Test",
    rarity: "Common",
    image: "src/assets/enemies/wolfCreature2.png",
    attack: 2,
    health: 3,
    totalHealth: 3,
  };

  const cyberSoldier: SpawnCard = {
    id: 789,
    name: "Cyber Soldier",
    description: "He is a soldier, but cyber",
    cost: 1,
    type: "Spawn",
    subtype: "Test",
    rarity: "Common",
    image: "src/assets/enemies/cyberSoldier.png",
    attack: 1,
    health: 1,
    totalHealth: 1,
  };

  const topTeamCombatants: Combatant[] = [
    {
      id: "e1",
      name: "Enemy 1",
      health: 100,
      hand: [
        JSON.parse(JSON.stringify(laserBlast)),
        JSON.parse(JSON.stringify(forceField)),
        JSON.parse(JSON.stringify(cyberSoldier)),
      ],
      deck: [
        (() => {
          let soldier = JSON.parse(JSON.stringify(cyberSoldier));
          soldier.name = "Cyber Soldier 2";
          return soldier;
        })(),
        JSON.parse(JSON.stringify(laserBlast)),
        (() => {
          let soldier = JSON.parse(JSON.stringify(cyberSoldier));
          soldier.name = "Cyber Soldier 3";
          return soldier;
        })(),
        JSON.parse(JSON.stringify(forceField)),
        (() => {
          let soldier = JSON.parse(JSON.stringify(cyberSoldier));
          soldier.name = "Cyber Soldier 4";
          return soldier;
        })(),
      ],
    },
    {
      id: "e2",
      name: "Enemy 2",
      health: 100,
      hand: [
        JSON.parse(JSON.stringify(laserBlast)),
        JSON.parse(JSON.stringify(forceField)),
        JSON.parse(JSON.stringify(cyberSoldier)),
      ],
      deck: [
        (() => {
          let soldier = JSON.parse(JSON.stringify(cyberSoldier));
          soldier.name = "Cyber Soldier 2B";
          return soldier;
        })(),
        JSON.parse(JSON.stringify(laserBlast)),
        (() => {
          let soldier = JSON.parse(JSON.stringify(cyberSoldier));
          soldier.name = "Cyber Soldier 3B";
          return soldier;
        })(),
        JSON.parse(JSON.stringify(forceField)),
        (() => {
          let soldier = JSON.parse(JSON.stringify(cyberSoldier));
          soldier.name = "Cyber Soldier 4B";
          return soldier;
        })(),
      ],
    },
  ];

  const bottomTeamCombatants: Combatant[] = [
    {
      id: "p1",
      name: "Player",
      health: 100,
      hand: [
        JSON.parse(JSON.stringify(wolf)),
        JSON.parse(JSON.stringify(forceField)),
        JSON.parse(JSON.stringify(deployableAutoTurret)),
      ],
      deck: [
        JSON.parse(JSON.stringify(deployableAutoTurret)),
        JSON.parse(JSON.stringify(laserBlast)),
        JSON.parse(JSON.stringify(deployableAutoTurret)),
        JSON.parse(JSON.stringify(forceField)),
        JSON.parse(JSON.stringify(deployableAutoTurret)),
      ],
    },
  ];

  const dispatch = useDispatch();

  // On Component Load
  useEffect(() => {
    // fetch data
    // set data
    setInitialBattlefield();
    setInitialTurnOrder();
  }, []);

  const setInitialBattlefield = () => {
    dispatch(
      setBattlefieldLayout({
        topTeamIds: [...topTeamCombatants.map((combatant) => combatant.id)],
        bottomTeamIds: [
          ...bottomTeamCombatants.map((combatant) => combatant.id),
        ],
      })
    );
    dispatch(
      setBattlefieldData({
        topTeam: [
          ...topTeamCombatants.map((combatant): CombatantBoardData => {
            return {
              combatantId: combatant.id,
              combatant,
              spawnSlotLayout: [...Array(MINIMUM_SLOTS).fill(null)],
              reactionSlotLayout: [...Array(MINIMUM_SLOTS).fill(null)],
            };
          }),
        ],
        bottomTeam: [
          ...bottomTeamCombatants.map((combatant): CombatantBoardData => {
            return {
              combatantId: combatant.id,
              combatant,
              spawnSlotLayout: [...Array(MINIMUM_SLOTS).fill(null)],
              reactionSlotLayout: [...Array(MINIMUM_SLOTS).fill(null)],
            };
          }),
        ],
      })
    );
  };

  // const createCombatantBoardMap = (combatants: Combatant[]) => {
  //   const STANDARD_SPAWN_SLOT_COUNT = 3; // TODO: setting ENV variable
  //   const STANDARD_REACTION_SLOT_COUNT = 3; // TODO: setting ENV variable

  //   const startingSpawnMap = new Map<number, SpawnSlot | null>();
  //   for (let i = 0; i < STANDARD_SPAWN_SLOT_COUNT; i++) {
  //     startingSpawnMap.set(i, null);
  //   }

  //   const startingReactionMap = new Map<number, ReactionSlot | null>();
  //   for (let i = 0; i < STANDARD_REACTION_SLOT_COUNT; i++) {
  //     startingReactionMap.set(i, null);
  //   }

  //   let combatantMap = new Map<number, CombatantBoardData | null>();
  //   combatants.forEach((combatant, index) => {
  //     combatantMap.set(index, {
  //       combatantId: combatant.id,
  //       combatant,
  //       spawnSlotLayout: startingSpawnMap,
  //       reactionSlotLayout: startingReactionMap,
  //     });
  //   });

  //   return combatantMap;
  // };

  const setInitialTurnOrder = () => {
    dispatch(setTurnQueue(calculateTurnOrder()));
    dispatch(
      setCurrentTurn({
        combatant: bottomTeamCombatants[0],
        position: "bottom",
        positionIndex: 0,
        isPlayer: true,
      })
    );
  };

  const calculateTurnOrder = (): Turn[] => {
    // Future State will do the agility calculation here
    return [
      {
        combatant: topTeamCombatants[0],
        position: "top",
        positionIndex: 0,
        isPlayer: false,
      },
      {
        combatant: topTeamCombatants[1],
        position: "top",
        positionIndex: 1,
        isPlayer: false,
      },
    ];
  };

  return (
    <>
      <TurnManager></TurnManager>
      <Battlefield></Battlefield>
    </>
  );
};
