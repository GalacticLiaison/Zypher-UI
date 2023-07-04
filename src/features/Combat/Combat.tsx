import { Battlefield } from "./Battlefield/Battlefield";
import { CombatCard } from "./CombatCards/CombatCard";

export interface Combatant {
  name: string;
  health: number;
  hand: CombatCard[];
  deck: CombatCard[];
}

export const Combat = () => {
  // Step 1 - fetch battle data from API
  //  - Who are the enemies?

  const topTeam: Combatant[] = [
    {
      name: "Enemy 1",
      health: 100,
      hand: [
        {
          id: 123,
          name: "Laser Blast",
          description: "Fire everything!",
          cost: 1,
          type: "Action",
          subtype: "Test",
          rarity: "Common",
          image: "src/assets/cards/laserBlast.png",
        },
        {
          id: 456,
          name: "Force Field",
          description: "Da Bubble",
          cost: 1,
          type: "Reaction",
          subtype: "Test",
          rarity: "Common",
          image: "src/assets/cards/forceField.png",
        },
        {
          id: 789,
          name: "Deployable Auto Turret",
          description: "Relax, Its got this",
          cost: 1,
          type: "Spawn",
          subtype: "Test",
          rarity: "Common",
          image: "src/assets/cards/deployableAutoTurret.png",
        },
      ],
      deck: [
        {
          id: 123,
          name: "Laser Blast",
          description: "Fire everything!",
          cost: 1,
          type: "Action",
          subtype: "Test",
          rarity: "Common",
          image: "src/assets/cards/laserBlast.png",
        },
        {
          id: 456,
          name: "Force Field",
          description: "Da Bubble",
          cost: 1,
          type: "Reaction",
          subtype: "Test",
          rarity: "Common",
          image: "src/assets/cards/forceField.png",
        },
        {
          id: 789,
          name: "Deployable Auto Turret",
          description: "Relax, Its got this",
          cost: 1,
          type: "Spawn",
          subtype: "Test",
          rarity: "Common",
          image: "src/assets/cards/deployableAutoTurret.png",
        },
      ],
    },
    {
      name: "Enemy 2",
      health: 100,
      hand: [
        {
          id: 123,
          name: "Laser Blast",
          description: "Fire everything!",
          cost: 1,
          type: "Action",
          subtype: "Test",
          rarity: "Common",
          image: "src/assets/cards/laserBlast.png",
        },
        {
          id: 456,
          name: "Force Field",
          description: "Da Bubble",
          cost: 1,
          type: "Reaction",
          subtype: "Test",
          rarity: "Common",
          image: "src/assets/cards/forceField.png",
        },
        {
          id: 789,
          name: "Deployable Auto Turret",
          description: "Relax, Its got this",
          cost: 1,
          type: "Spawn",
          subtype: "Test",
          rarity: "Common",
          image: "src/assets/cards/deployableAutoTurret.png",
        },
      ],
      deck: [
        {
          id: 123,
          name: "Laser Blast",
          description: "Fire everything!",
          cost: 1,
          type: "Action",
          subtype: "Test",
          rarity: "Common",
          image: "src/assets/cards/laserBlast.png",
        },
        {
          id: 456,
          name: "Force Field",
          description: "Da Bubble",
          cost: 1,
          type: "Reaction",
          subtype: "Test",
          rarity: "Common",
          image: "src/assets/cards/forceField.png",
        },
        {
          id: 789,
          name: "Deployable Auto Turret",
          description: "Relax, Its got this",
          cost: 1,
          type: "Spawn",
          subtype: "Test",
          rarity: "Common",
          image: "src/assets/cards/deployableAutoTurret.png",
        },
      ],
    },
  ];
  const bottomTeam: Combatant[] = [
    {
      name: "Player",
      health: 100,
      hand: [
        {
          id: 123,
          name: "Laser Blast",
          description: "Fire everything!",
          cost: 1,
          type: "Action",
          subtype: "Test",
          rarity: "Common",
          image: "src/assets/cards/laserBlast.png",
        },
        {
          id: 456,
          name: "Force Field",
          description: "Da Bubble",
          cost: 1,
          type: "Reaction",
          subtype: "Test",
          rarity: "Common",
          image: "src/assets/cards/forceField.png",
        },
        {
          id: 789,
          name: "Deployable Auto Turret",
          description: "Relax, Its got this",
          cost: 1,
          type: "Spawn",
          subtype: "Test",
          rarity: "Common",
          image: "src/assets/cards/deployableAutoTurret.png",
        },
      ],
      deck: [
        {
          id: 123,
          name: "Laser Blast",
          description: "Fire everything!",
          cost: 1,
          type: "Action",
          subtype: "Test",
          rarity: "Common",
          image: "src/assets/cards/laserBlast.png",
        },
        {
          id: 456,
          name: "Force Field",
          description: "Da Bubble",
          cost: 1,
          type: "Reaction",
          subtype: "Test",
          rarity: "Common",
          image: "src/assets/cards/forceField.png",
        },
        {
          id: 789,
          name: "Deployable Auto Turret",
          description: "Relax, Its got this",
          cost: 1,
          type: "Spawn",
          subtype: "Test",
          rarity: "Common",
          image: "src/assets/cards/deployableAutoTurret.png",
        },
      ],
    },
  ];

  return <Battlefield topTeam={topTeam} bottomTeam={bottomTeam}></Battlefield>;
};
