import { Mutation } from "../mutation-service";

export interface Character {
  name: string;
  level: number;
  health: number;
  maxHealth: number;
  stats: PlayerStats;
  morphology: {
    gender: string;
    head: {
      face: FaceType;
      eyes: Eye[];
      ears: EarType;
      hair: Hair;
    };
    torso: {
      type: TorsoType;
      arms: Arm[];
      back: BackType;
    };
    bottom: {
      type: BottomType;
      legs: Leg[];
    };
    skin: {
      type: SkinType;
      color: SkinColor;
    };
    muscle: {
      size: number;
      tone: number;
      type: MuscleType;
    };
    mutations: Mutation[];
  };
  perks: Perk[];
  statChanges: StatChange[];
}

export type PlayerStat =
  | "strength"
  | "fortitude"
  | "agility"
  | "will"
  | "intelligence"
  | "charisma"
  | "luck";
export interface PlayerStats {
  strength: number;
  fortitude: number;
  agility: number;
  will: number;
  intelligence: number;
  charisma: number;
  luck: number;
}

export interface Perk {
  id: string;
  name: string;
  description: string;
  appliedStatBonuses: StatChange[];
  image: string;
}

export type PerkPropertyTypes = string | StatChange[];

export interface StatChange {
  stat: PlayerStat;
  value: number;
}

export interface Eye {
  type: EyeType;
  color: EyeColor;
}

export interface Hair {
  color: HairColor;
  style: HairStyle;
}

export interface Arm {
  type: ArmType;
  hand: HandType;
}

export interface Leg {
  type: LegType;
  foot: FootType;
}

// ===================  Morphology Types ===================
export type FaceType = "Human" | "Animal" | "Robot";
export type TorsoType = "Human" | "Animal" | "Robot";
export type BottomType = "Human" | "Animal" | "Robot";
export type SkinType = "Human" | "Animal" | "Robot";
export type MuscleType = "Human" | "Animal" | "Robot";
export type EyeType = "Human" | "Animal" | "Robot";
export type EyeColor = "Blue" | "Green" | "Brown" | "Black" | "Red" | "Yellow";
export type HairColor = "Blonde" | "Brown" | "Black" | "Red" | "White" | "Grey";
export type HairStyle = "Short" | "Medium" | "Long" | "Bald" | "Braided";
export type SkinColor = "White" | "Brown" | "Black" | "Tan" | "Pale";
export type EarType = "Human" | "Animal" | "Robot";
export type ArmType = "Human" | "Animal" | "Robot";
export type HandType = "Human" | "Animal" | "Robot";
export type LegType = "Human" | "Animal" | "Robot";
export type FootType = "Human" | "Animal" | "Robot";
export type BackType = "Human" | "Animal" | "Robot";

export type MutatableFeature =
  | "FaceType"
  | "TorsoType"
  | "BottomType"
  | "SkinType"
  | "MuscleType"
  | "EyeType"
  | "EyeColo"
  | "EarType"
  | "ArmType"
  | "HandType"
  | "LegType"
  | "FootType";
