import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Player } from "../../../../services/character-service/character-factory";

export interface Perk {
  id: string;
  name: string;
  description: string;
  bonuses: any[];
}

interface IPlayerPerksProps {
  perks: Perk[];
}

export const PlayerPerks = (props: IPlayerPerksProps) => {
  const [perks, setPerks] = useState<Perk[]>([
    {
      id: "1",
      name: "Lucky Rabbit's Foot",
      description: "You have a rabbit's foot. how lucky!",
      bonuses: [
        {
          stat: "luck",
          value: 5,
        },
      ],
    },
  ]);
  //   useEffect(() => {
  //     setPerks(props.perks);
  //   }, [props.perks]);

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h4" component="div">
          Perks:
        </Typography>
        <Grid container spacing={3}>
          {perks.map((perk) => (
            <Grid item xs={4} key={perk.id}>
              <Typography variant="h5" component="div">
                {perk.name}
              </Typography>
              <Typography variant="caption" component="div">
                {perk.description}
              </Typography>
              {perk.bonuses?.map((bonus, index) => {
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
