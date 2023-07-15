import { useEffect, useRef, useState } from "react";
import { CombatCard } from "./CombatCard";
import { useDispatch } from "react-redux";
import { addToAttackers } from "../combatSlice";

export interface SpawnCard extends CombatCard {
  type: "Spawn";
  attack: number;
  health: number;
  totalHealth: number;
  isAttacking: boolean;
}

export interface ISpawnCardProps {
  card: SpawnCard | null;
  position: "top" | "bottom";
  played?: boolean;
  isEdit?: boolean;
}

export const SpawnCard = (props: ISpawnCardProps) => {
  const firstPlay = useRef<boolean>(true);

  const [health, setHealth] = useState(0);
  const [attack, setAttack] = useState(0);
  const [card, setCard] = useState<SpawnCard | null>(props.card);
  const [isAttacking, setIsAttacking] = useState<boolean>(
    props?.card?.isAttacking ?? false
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (card) {
      if (firstPlay.current) {
        // on first play, spawn is ready to attack
        dispatch(addToAttackers({ attacker: card, position: props.position }));
        firstPlay.current = false;
      }
      if (props.card?.type == "Spawn") {
        setCard(card);
        setHealth(card.health);
        setAttack(card.attack);
      }
    }
  }, [props.card]);

  useEffect(() => {
    if (!props.card) return;

    setIsAttacking(props.card.isAttacking);
    if (props.card.isAttacking == true && card) {
      // pushes the card to an isAttacking queue
      dispatch(addToAttackers({ attacker: card, position: props.position }));
      // BattleManager is triggered by change and figures out fight, updates state
    }
  }, [props.card?.isAttacking]);

  if (card && card.type != "Spawn")
    return <div>Error: Wrong Card Type in Spawn Slot</div>;

  return (
    <span style={isAttacking ? { border: "1px red solid" } : {}}>
      <CombatCard
        card={card}
        played={true}
        stats={{ attack, health }}
      ></CombatCard>
    </span>
  );
};
