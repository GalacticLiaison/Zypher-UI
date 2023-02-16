import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Paper from "@mui/material/Paper";
import Grow from "@mui/material/Grow";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Theme } from "@mui/material/styles";
import { CombatCard } from "../CombatCards/CombatCard";
import Grid from "@mui/material/Grid";
import { Draggable } from "../DraggableAndDroppable/Draggable";
import Slide from "@mui/material/Slide";
import { useEffect, useState } from "react";

const icon = (
  <Paper sx={{ m: 1 }} elevation={4}>
    <Box component="svg" sx={{ width: 100, height: 100 }}>
      <Box
        component="polygon"
        sx={{
          fill: (theme: Theme) => theme.palette.common.white,
          stroke: (theme) => theme.palette.divider,
          strokeWidth: 1,
        }}
        points="0,100 50,00, 100,100"
      />
    </Box>
  </Paper>
);

interface IPlayerHandProps {
  selectCard?: (card: CombatCard) => void;
  handIsOpen?: boolean;
  cards: JSX.Element[];
}

export const PlayerHand = (props: IPlayerHandProps) => {
  const [checked, setChecked] = useState(false);
  const [cards, setCards] = useState<JSX.Element[]>([]);
  useEffect(() => {
    if (props.cards == undefined) return;
    setCards(props.cards);
  }, [props.cards]);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const handleCardClick = () => {
    // if (props.selectCard == undefined) return;
    // props.selectCard(card);
    console.log("Card Clicked");
    // console.log({ card });
  };

  return (
    <Box sx={{ height: 180 }}>
      <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} />}
        label="Show"
      />

      <Grid container>
        {cards?.map((card, index) => {
          return (
            <Grid item xs={2} key={index}>
              <div>
                <Slide
                  direction="right"
                  in={checked}
                  mountOnEnter
                  unmountOnExit
                >
                  <div>{card}</div>
                </Slide>
              </div>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
