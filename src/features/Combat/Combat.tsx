import { CombatCard } from "./CombatCards/CombatCard";
import { SpawnCard } from "./CombatCards/SpawnCard";
import { BattleExecutor } from "./Battle/BattleExecutor";

export interface Combatant {
  name: string;
  health: number;
  hand: (CombatCard | SpawnCard)[];
  deck: (CombatCard | SpawnCard)[];
}

export const Combat = () => {
  /*
    Responsibilities:
    - Entrance to the Combat Feature
    - Fetches Data (combatants, cards, etc)
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

  return (
    <BattleExecutor
      topTeamCombatants={topTeamCombatants}
      bottomTeamCombatants={bottomTeamCombatants}
    ></BattleExecutor>
  );
};
