import { Combatant } from "../../Combat";

const MAX_HAND_SIZE = 7;

export const drawCard = (combatant: Combatant) => {
  if (combatant.hand.length < MAX_HAND_SIZE) {
    const card = combatant.deck.shift();
    if (card) {
      combatant.hand.push(card);
    }
  }
};
