import { Battlefield } from "./Battlefield/Battlefield";
import { CombatCard } from "./CombatCards/CombatCard";
import { SpawnCard } from "./CombatCards/SpawnCard";

export interface Combatant {
  name: string;
  health: number;
  hand: (CombatCard | SpawnCard)[];
  deck: (CombatCard | SpawnCard)[];
}

export const Combat = () => {
  // Step 1 - fetch battle data from API
  //  - Who are the enemies?

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
  };

  const topTeam: Combatant[] = [
    {
      name: "Enemy 1",
      health: 100,
      hand: [laserBlast, forceField, deployableAutoTurret],
      deck: [
        deployableAutoTurret,
        laserBlast,
        deployableAutoTurret,
        forceField,
        deployableAutoTurret,
      ],
    },
    {
      name: "Enemy 2",
      health: 100,
      hand: [laserBlast, forceField, deployableAutoTurret],
      deck: [
        deployableAutoTurret,
        laserBlast,
        deployableAutoTurret,
        forceField,
        deployableAutoTurret,
      ],
    },
  ];
  const bottomTeam: Combatant[] = [
    {
      name: "Player",
      health: 100,
      hand: [laserBlast, forceField, deployableAutoTurret],
      deck: [
        deployableAutoTurret,
        laserBlast,
        deployableAutoTurret,
        forceField,
        deployableAutoTurret,
      ],
    },
  ];

  return <Battlefield topTeam={topTeam} bottomTeam={bottomTeam}></Battlefield>;
};
