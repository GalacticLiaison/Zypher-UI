import { useEffect, useState } from "react";
import { CombatCard } from "./CombatCard";

export interface SpawnCard extends CombatCard {
  type: "Spawn";
  attack: number;
  health: number;
  totalHealth: number;
}

export interface ISpawnCardProps {
  card: SpawnCard;
  isAttacking?: boolean;
  played?: boolean;
  isEdit?: boolean;
}

export const SpawnCard = (props: ISpawnCardProps) => {
  const [health, setHealth] = useState(0);
  const [attack, setAttack] = useState(0);
  const [card, setCard] = useState<SpawnCard>(props.card);

  useEffect(() => {
    if (card == undefined) return;
    if (card.type == "Spawn") {
      setCard(card);
      setHealth(card.health);
      setAttack(card.attack);
    }
  }, [props.card]);

  if (card.type != "Spawn")
    return <div>Error: Wrong Card Type in Spawn Slot</div>;

  return (
    <CombatCard
      card={card}
      played={true}
      stats={{ attack, health }}
    ></CombatCard>
  );
};
