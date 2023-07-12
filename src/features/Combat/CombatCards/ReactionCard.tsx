import { useEffect, useState } from "react";
import { CombatCard } from "./CombatCard";

export interface ReactionCard extends CombatCard {
  type: "Reaction";
}

export interface IReactionCardProps {
  card: ReactionCard;
  played?: boolean;
  isEdit?: boolean;
}

export const ReactionCard = (props: IReactionCardProps) => {
  const [card, setCard] = useState<ReactionCard>(props.card);

  useEffect(() => {
    if (card == undefined) return;
    if (card.type == "Reaction") {
      setCard(card);
    }
  }, [props.card]);

  if (card.type != "Reaction")
    return <div>Error: Wrong Card Type in Reaction Slot</div>;

  return <CombatCard card={card} played={true}></CombatCard>;
};
