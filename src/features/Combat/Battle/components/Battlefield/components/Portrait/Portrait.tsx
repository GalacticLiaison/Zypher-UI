import { Card, CardMedia, Grid } from "@mui/material";
import { Combatant } from "../../../../../Combat";
import { useState } from "react";

export interface IDeckProps {
  combatant: Combatant;
}

export const Portrait = (props: IDeckProps) => {
  const [combatant, setCombatant] = useState<Combatant>(props.combatant);

  return (
    <div
      style={{
        height: "9em",
        width: "6em",
        color: "black",
        backgroundColor: "lightpink",
        borderWidth: "3px",
        borderStyle: "dashed",
        borderColor: "purple",
      }}
    >
      <Card>
        <Grid container>
          <Grid item xs={12}>
            <CardMedia component="img" image={combatant.image} />
          </Grid>
          <Grid item xs={12}>
            {combatant.health}
          </Grid>
          <Grid item xs={12}>
            {combatant.name}
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};
