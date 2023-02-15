import Grid from "@mui/material/Grid";
import { useState } from "react";
import { PlaySlot } from "./components/PlaySlot";

interface IBattlefieldProps {}

export const Battlefield = (props: IBattlefieldProps) => {
  return (
    <Grid container>
      {[0, 1, 2, 3, 4].map((card, index) => {
        return (
          <Grid key={index} item xs={2}>
            <PlaySlot></PlaySlot>
          </Grid>
        );
      })}
    </Grid>
  );
};
