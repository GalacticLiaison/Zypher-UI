import Grid from "@mui/material/Grid";
import { useState } from "react";
import { Player } from "../../services/character-service/character-factory";
import { PlayerDescription } from "./components/PlayerDescription/PlayerDescription";
import { PlayerMorphology } from "./components/PlayerMorphology/PlayerMorphology";
import { Perk, PlayerPerks } from "./components/PlayerPerks/PlayerPerks";
import {
  PlayerStatistics,
  StatChange,
} from "./components/PlayerStats/PlayerStats";

interface IPlayerSheetProps {
  player: Player;
}

export const PlayerSheet = (props: IPlayerSheetProps) => {
  const [player, setPlayer] = useState<Player>(props.player);

  // todo:
  const statChanges: StatChange[] = [];
  const playerPerks: Perk[] = [];

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
        <PlayerPerks perks={playerPerks}></PlayerPerks>
      </Grid>
    </Grid>
  );
};
