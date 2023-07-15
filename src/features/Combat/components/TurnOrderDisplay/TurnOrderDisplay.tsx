import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import { CombatState } from "../../combatSlice";
import { useEffect, useState } from "react";
import { Turn } from "../TurnManager/TurnManager";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

export const TurnOrderDisplay = () => {
  const { turnQueue, currentTurn } = useSelector(
    (store: any) => store.combat
  ) as CombatState;

  const [displayedTurns, setDisplayedTurns] = useState<Array<Turn>>(
    turnQueue.slice(0, 5)
  );

  useEffect(() => {
    setDisplayedTurns(turnQueue.slice(0, 5));
  }, [turnQueue]);

  return (
    <Grid container>
      <Grid item container xs={12}>
        <Grid item xs={2}>
          <Card style={{ backgroundColor: "lightgreen" }}>
            <CardMedia
              sx={{ height: 140 }}
              image={currentTurn.turnTaker.image}
              title="Turn"
            />
            <div>{currentTurn.turnTaker.name}</div>
            <div>Turn Taker</div>
          </Card>
        </Grid>
        {displayedTurns.map((turn, index) => {
          return (
            <Grid item xs={2} key={index}>
              <Card style={{ backgroundColor: "lightblue" }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={turn.turnTaker.image}
                  title="Turn"
                />
                <div>{turn.turnTaker.name}</div>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};
