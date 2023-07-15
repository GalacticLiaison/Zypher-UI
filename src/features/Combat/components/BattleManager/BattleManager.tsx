import {
  CombatState,
  destroyCard,
  setAttackQueue,
  updateCard,
} from "../../combatSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ISpawnCardProps, SpawnCard } from "../../CombatCards/SpawnCard";

export const BattleManager = () => {
  const { attackQueue, attackInProgress, battlefieldData } = useSelector(
    (store: any) => store.combat
  ) as CombatState;

  const [attackerPosition, setAttackerPosition] = useState<"top" | "bottom">();
  const [attacker, setAttacker] = useState<SpawnCard>();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("attackQueue: ", attackQueue);
    if (attackQueue.length > 0 && attacker != attackQueue[0].attacker) {
      const attack = attackQueue[0];
      setAttacker(attack.attacker);
      setAttackerPosition(attack.position);
      console.log("attacker: ", attacker);

      // attack enemy

      // update queue
    }
  }, [attackQueue]);

  useEffect(() => {
    if (attackInProgress == true) {
      console.log("attackInProgress: ", attackInProgress);
      // attackRandomEnemy();
      // dispatch(setAttackQueue(attackQueue.slice(1)));
    }
  }, [attackInProgress]);

  const attackRandomEnemy = () => {
    const enemySpawns: ISpawnCardProps[] = (
      attackerPosition == "top"
        ? battlefieldData.bottomTeam
        : battlefieldData.topTeam
    )
      .map((boardData) => boardData.spawnSlotLayout)
      .flat()
      .filter((spawn) => spawn !== undefined);

    const enemy = getRandomEnemy(enemySpawns);

    if (enemy) {
      applyDamage(enemy);
    }

    function applyDamage(enemy: ISpawnCardProps) {
      if (!enemy.card) return;

      enemy.card.health -= attacker?.attack as number;

      if (enemy.card.health <= 0) {
        dispatch(
          destroyCard({
            position: "bottom",
            card: enemy.card,
            cardType: "Spawn",
          })
        );
      } else {
        dispatch(
          updateCard({
            position: "bottom",
            card: enemy.card,
            cardType: "Spawn",
          })
        );
      }
    }

    function getRandomEnemy(
      enemySpawns: ISpawnCardProps[]
    ): ISpawnCardProps | undefined {
      const enemy = enemySpawns[Math.floor(Math.random() * enemySpawns.length)];
      if (enemy) {
        return enemy;
      }
    }
  };

  return <></>;
};
