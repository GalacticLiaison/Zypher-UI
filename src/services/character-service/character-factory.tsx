import {
  Character,
  EyeColor,
  HairColor,
  HairStyle,
  SkinColor,
} from "./Character";

export interface Player extends Character {
  inventory: {};
}

export interface NewPlayerParams {
  name: string;
  gender: string;
  eyeColor: EyeColor;
  hairColor: HairColor;
  hairStyle: HairStyle;
  skinColor: SkinColor;
}

export const createNewPlayer = (params: NewPlayerParams): Player => {
  return {
    name: params.name,
    level: 1,
    health: 100,
    maxHealth: 100,
    stats: {
      strength: 10,
      fortitude: 10,
      agility: 10,
      will: 10,
      intelligence: 10,
    },
    morphology: {
      gender: params.gender,
      head: {
        face: "Human",
        eyes: [
          {
            type: "Human",
            color: params.eyeColor,
          },
          {
            type: "Human",
            color: params.eyeColor,
          },
        ],
        ears: "Human",
        hair: {
          style: params.hairStyle,
          color: params.hairColor,
        },
      },
      torso: {
        type: "Human",
        arms: [
          {
            type: "Human",
            hand: "Human",
          },
          {
            type: "Human",
            hand: "Human",
          },
        ],
        back: "Human",
      },
      bottom: {
        type: "Human",
        legs: [
          {
            type: "Human",
            foot: "Human",
          },
          {
            type: "Human",
            foot: "Human",
          },
        ],
      },
      skin: {
        type: "Human",
        color: params.skinColor,
      },
      muscle: {
        size: 0,
        tone: 0,
        type: "Human",
      },
      mutations: [],
    },
    inventory: {},
  };
};
