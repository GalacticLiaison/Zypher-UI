import Grid from "@mui/material/Grid";
import { Portrait } from "../../Portrait/Portrait";
import { Hand } from "../../Hand/Hand";
import { Deck } from "../../Deck/Deck";
import { useEffect, useState } from "react";
import { CombatCard } from "../../../../../../CombatCards/CombatCard";
import { CombatState, CombatantBoardData } from "../../../../../../combatSlice";
import { useSelector } from "react-redux";
import { PlaySlots } from "../../PlaySlots/PlaySlots";

export interface IBottomCombatantProps {
  index: number;
  combatantId: string;

  handleCardClick: (card: CombatCard) => void;
}

export const BottomCombatant = (props: IBottomCombatantProps) => {
  const { battlefieldData } = useSelector(
    (store: any) => store.combat
  ) as CombatState;

  const [combatantId, setCombatantId] = useState<string>(props.combatantId);
  useEffect(() => {
    setCombatantId(props.combatantId);
  }, [props.combatantId]);

  const getCombatantBoard = () => {
    return battlefieldData.bottomTeam.find(
      (board: CombatantBoardData) => board.combatant.id === combatantId
    );
  };

  const [board, setBoard] = useState<CombatantBoardData | undefined>(
    getCombatantBoard()
  );

  const [bottomTeamLength, setBottomTeamLength] = useState<number>(
    battlefieldData.bottomTeam.length
  );

  useEffect(() => {
    setBoard(getCombatantBoard());
    setBottomTeamLength(battlefieldData.bottomTeam.length);
  }, [battlefieldData]);

  return board ? (
    <Grid container item xs={12 / bottomTeamLength ?? 12} spacing={3}>
      <PlaySlots
        combatantId={combatantId}
        position="bottom"
        playSlotsType="Spawn"
        droppableIdPrefix={`bottom-${props.index}-spawn-`}
      ></PlaySlots>
      <PlaySlots
        combatantId={combatantId}
        playSlotsType="Reaction"
        position="bottom"
        droppableIdPrefix={`bottom-${props.index}-reaction-`}
      ></PlaySlots>
      <Grid id="playerCards" container item spacing={3} xs={12}>
        <Grid item xs={10}>
          <Hand
            combatantPositionId={`bottom-${props.index}`}
            cards={board.combatant.hand}
          ></Hand>
        </Grid>
        <Grid item xs={2}>
          <Deck count={board.combatant.deck.length}></Deck>
        </Grid>
      </Grid>
      <Grid id="portrait" container item xs={12}>
        <Grid item xs={5}></Grid>
        <Grid item xs={2}>
          <Portrait combatant={board.combatant}></Portrait>
        </Grid>
        <Grid item xs={5}></Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </Grid>
  ) : (
    <div>Loading Bottom Combatant.....</div>
  );
};
