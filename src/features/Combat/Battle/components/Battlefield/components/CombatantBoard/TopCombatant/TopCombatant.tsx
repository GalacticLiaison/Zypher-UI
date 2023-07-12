import Grid from "@mui/material/Grid";
import { Portrait } from "../../Portrait/Portrait";
import { useEffect, useState } from "react";
import { CombatCard } from "../../../../../../CombatCards/CombatCard";
import { Hand } from "../../Hand/Hand";
import { Deck } from "../../Deck/Deck";
import { CombatState, CombatantBoardData } from "../../../../../../combatSlice";
import { useSelector } from "react-redux";
import { PlaySlots } from "../../PlaySlots/PlaySlots";

export interface ITopCombatantProps {
  index: number;
  combatantId: string;

  handleCardClick: (card: CombatCard) => void;
}

export const TopCombatant = (props: ITopCombatantProps) => {
  const { battlefieldData } = useSelector(
    (store: any) => store.combat
  ) as CombatState;

  const [combatantId, setCombatantId] = useState<string>(props.combatantId);
  useEffect(() => {
    setCombatantId(props.combatantId);
  }, [props.combatantId]);

  const getCombatantBoard = () => {
    return battlefieldData.topTeam.find(
      (board: CombatantBoardData) => board.combatant.id === combatantId
    );
  };

  const [board, setBoard] = useState<CombatantBoardData | undefined>(
    getCombatantBoard()
  );

  const [topTeamLength, setTopTeamLength] = useState<number>(
    battlefieldData.topTeam.length
  );

  useEffect(() => {
    setBoard(getCombatantBoard());
    setTopTeamLength(battlefieldData.topTeam.length);
  }, [battlefieldData]);

  return board ? (
    <Grid container item xs={12 / topTeamLength ?? 12} spacing={3}>
      <Grid id="portrait" container item xs={12}>
        <Grid item xs={5}></Grid>
        <Grid item xs={2}>
          <Portrait combatant={board.combatant}></Portrait>
        </Grid>
        <Grid item xs={5}></Grid>
        <Grid item xs={12}></Grid>
      </Grid>
      <Grid id="playerCards" container item spacing={3} xs={12}>
        <Grid item xs={10}>
          <Hand
            combatantPositionId={`top-${props.index}`}
            cards={board.combatant.hand}
          ></Hand>
        </Grid>
        <Grid item xs={2}>
          <Deck count={board.combatant.deck.length}></Deck>
        </Grid>
      </Grid>
      <PlaySlots
        combatantId={combatantId}
        position="top"
        playSlotsType="Reaction"
        droppableIdPrefix={`top-${props.index}-reaction-`}
      ></PlaySlots>
      <PlaySlots
        combatantId={combatantId}
        position="top"
        playSlotsType="Spawn"
        droppableIdPrefix={`top-${props.index}-spawn-`}
      ></PlaySlots>
    </Grid>
  ) : (
    <div>Loading Top Combatant.....</div>
  );
};
