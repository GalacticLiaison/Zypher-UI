import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { StatChange } from "../../services/character-service/Character";
import { Player } from "../../services/character-service/character-factory";
import { PlayerDescription } from "./components/PlayerDescription/PlayerDescription";
import { PlayerMorphology } from "./components/PlayerMorphology/PlayerMorphology";
import { PlayerPerks } from "./components/PlayerPerks/PlayerPerks";
import { PlayerStatistics } from "./components/PlayerStats/PlayerStats";

interface IPlayerSheetProps {
  player: Player;
}

export const PlayerSheet = (props: IPlayerSheetProps) => {
  const [player, setPlayer] = useState<Player>(props.player);
  const [statChanges, setStatChanges] = useState<StatChange[]>(
    player.statChanges
  );

  useEffect(() => {
    setPlayer(props.player);
    setStatChanges(props.player.statChanges);
  }, [props.player]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <PlayerMorphology player={player}></PlayerMorphology>
      </Grid>
      <Grid item xs={12}>
        <PlayerDescription player={player}></PlayerDescription>
      </Grid>
      <Grid item xs={12}>
        <PlayerStatistics
          playerStats={player.stats}
          statChanges={statChanges}
        ></PlayerStatistics>
      </Grid>
      <Grid item xs={12}>
        <PlayerPerks perks={player.perks}></PlayerPerks>
      </Grid>
    </Grid>
  );
};
