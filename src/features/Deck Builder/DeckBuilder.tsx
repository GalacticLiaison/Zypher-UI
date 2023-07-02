import { Grid } from "@mui/material";
import { _getAllCards } from "../../api/hooks/Cards/getAllCards";
import { useEffect, useState } from "react";
import { CombatCard } from "../Combat/CombatCards/CombatCard";

interface IDeckBuilderProps {}

export const DeckBuilder = (props: IDeckBuilderProps) => {
  // GET CARD DATA FROM API
  const [cards, setCards] = useState([] as CombatCard[]);
  const { data, isLoading } = _getAllCards();
  useEffect(() => {
    if (!data) return;
    setCards(data as CombatCard[]);
  }, [data]);

  // GET DECK DATA FROM API

  // DISPLAY DECK

  // DISPLAY CARD LIST

  return (
    <Grid container spacing={3}>
      DECK BUILDER
      {cards?.map((card, index) => {
        return (
          <Grid key={index} item xs={2}>
            <CombatCard card={card}></CombatCard>;
          </Grid>
        );
      })}
    </Grid>
  );
};
