import { Grid } from "@mui/material";
import { Combatant } from "../../../../../Combat";

export interface IDeckProps {
  combatant: Combatant;
}

export const Portrait = (props: IDeckProps) => {
  return (
    <div
      style={{
        height: "9em",
        width: "6em",
        color: "black",
        backgroundColor: "lightpink",
        borderWidth: "3px",
        borderStyle: "dashed",
        borderColor: "black",
      }}
    >
      <Grid container>
        <Grid item xs={12}>
          {props.combatant.health}
        </Grid>
        <Grid item xs={12}>
          {props.combatant.name}
        </Grid>
      </Grid>
    </div>
  );
};
