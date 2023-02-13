import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import {
  PlayerStat,
  PlayerStats,
  StatChange,
} from "../../../../services/character-service/Character";

interface IPlayerStats {
  playerStats: PlayerStats;
  statChanges?: StatChange[];
}

export const PlayerStatistics = (props: IPlayerStats) => {
  const [playerStats, setPlayerStats] = useState<PlayerStats>(
    props.playerStats
  );
  useEffect(() => {
    setPlayerStats(props.playerStats);
  }, [props.playerStats]);

  const [statChanges, setStatChanges] = useState<StatChange[]>(
    props.statChanges ?? []
  );
  useEffect(() => {
    setStatChanges(props.statChanges ?? []);
  }, [props.statChanges]);

  const displayStat = (stat: PlayerStat) => {
    return (
      <div>
        {stat}: {playerStats[stat] + determineStatBonus(stat)}{" "}
        {displayBonus(determineStatBonus(stat))}
      </div>
    );
  };

  const determineStatBonus = (stat: PlayerStat) => {
    const bonusesForThisStat = statChanges.filter((x) => x.stat === stat);

    let totalChange = 0;
    bonusesForThisStat.forEach((x) => {
      totalChange += x.value;
    });
    return totalChange;
  };

  const displayBonus = (totalChange: number) => {
    const isPositiveChange = totalChange >= 0;
    const operator = isPositiveChange ? "+" : "-";
    return (
      <div style={determineBonusStyle(isPositiveChange)}>
        {`(${operator}${totalChange})`}
      </div>
    );
  };

  const determineBonusStyle = (isPositiveChange: boolean) => {
    return {
      color: isPositiveChange ? "green" : "red",
    };
  };

  return (
    <Grid item xs={4}>
      <Card>
        <Typography variant="h4">Stats</Typography>
        <div>{displayStat("strength")}</div>
        <div>{displayStat("fortitude")}</div>
        <div>{displayStat("agility")}</div>
        <div>{displayStat("intelligence")}</div>
        <div>{displayStat("will")}</div>
        <div>{displayStat("charisma")}</div>
        <div>{displayStat("luck")}</div>
      </Card>
    </Grid>
  );
};
