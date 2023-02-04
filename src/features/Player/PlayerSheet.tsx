import Grid from "@mui/material/Grid";
import { useState } from "react";
import { Player } from "../../services/character-service/character-factory";
import { PlayerDescription } from "./components/PlayerDescription/PlayerDescription";
import { PlayerMorphology } from "./components/PlayerMorphology/PlayerMorphology";

interface IPlayerSheetProps {
  player: Player;
}

export const PlayerSheet = (props: IPlayerSheetProps) => {
  const [player, setPlayer] = useState<Player>(props.player);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <PlayerMorphology player={player}></PlayerMorphology>
      </Grid>
      <Grid item xs={12}>
        <PlayerDescription player={player}></PlayerDescription>);
      </Grid>
    </Grid>
  );
};
