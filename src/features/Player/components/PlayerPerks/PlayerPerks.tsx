import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Perk } from "../../../../services/character-service/Character";

interface IPlayerPerksProps {
  perks: Perk[];
}

export const PlayerPerks = (props: IPlayerPerksProps) => {
  const [perks, setPerks] = useState<Perk[]>(props.perks);
  useEffect(() => {
    setPerks(props.perks);
  }, [props.perks]);

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h4" component="div">
          Perks:
        </Typography>
        <Grid container spacing={3}>
          {perks.map((perk, index) => (
            <Grid item xs={4} key={index}>
              <Typography variant="h5" component="div">
                {perk.name}
              </Typography>
              <Typography variant="caption" component="div">
                {perk.description}
              </Typography>
              {perk.appliedStatBonuses?.map((bonus, index) => {
                return (
                  <Typography variant="subtitle1" component="div" key={index}>
                    {bonus.stat}: {bonus.value}
                  </Typography>
                );
              })}
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};
