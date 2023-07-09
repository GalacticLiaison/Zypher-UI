import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { UpdateImage } from "../../../global-components/ContentImage/ContentImage";
import { SpawnCard } from "./SpawnCard";

type CombatCardType = "Action" | "Spawn" | "Reaction";
export interface CombatCard {
  id: number;
  name: string;
  description: string;
  cost: number;
  type: CombatCardType;
  subtype: string;
  rarity: string;
  image: string;
}

export type CombatCardPropertyTypes = string | number;

export type UpdateCardProperty = (
  propertyName: keyof CombatCard,
  value: CombatCardPropertyTypes
) => void;

const newCard: CombatCard = {
  id: 0,
  name: "",
  description: "",
  cost: 0,
  type: "Action",
  subtype: "",
  rarity: "Common",
  image: "src/assets/genes/UnknownGene.png",
};

export interface ICombatCardProps {
  card?: CombatCard | null;
  played?: boolean;
  updateCardProperty?: UpdateCardProperty;
  updateImage?: UpdateImage;
  isEdit?: boolean;
  size?: { height: number; width: number };
}

export const CombatCard = (props: ICombatCardProps) => {
  const [health, setHealth] = useState(0);
  const [attack, setAttack] = useState(0);
  const [card, setCard] = useState<CombatCard>(props.card ?? newCard);

  useEffect(() => {
    if (card == undefined) return;
    if (card.type == "Spawn") {
      setHealth((card as SpawnCard).health);
      setAttack((card as SpawnCard).attack);
    }
  }, [card]);

  useEffect(() => {
    if (props.card == undefined) return;
    setCard(props.card);
  }, [props.card]);

  const [isEdit, setIsEdit] = useState(props.isEdit ?? false);
  useEffect(() => {
    if (props.isEdit == undefined) return;
    setIsEdit(props.isEdit);
  }, [props.isEdit]);

  const testDescription = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
  enim ad minim veniam, quis nostrud exercitation ullamco laboris
  nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
  in reprehenderit in voluptate velit esse cillum dolore eu fugiat
  nulla pariatur. Excepteur sint occaecat cupidatat non proident,
  sunt in culpa qui officia deserunt mollit anim id est laborum.`;

  const cardMediaStyles: React.CSSProperties = {
    width: "100%",
  };

  const gridContainerStyles: React.CSSProperties = {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
  };

  const gridRowStyles: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: "1.3em",
  };

  // const cardHeight = props.size?.height ?? 200;
  const cardWidth = props.size?.width ?? 100;

  const cardStyles: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    height: `100%`,
    width: !props.played ? `${cardWidth}px` : "100%",
  };

  /*
    TODO: This solution is so damn overcomplicated. 
    To handle the font size, I should just check length 
    and make step down size breakpoints for different length strings
  */

  const calculateFontSize = (
    text: string | undefined,
    cardWidthEffectStrength: number = 1,
    textLengthEffectStrength: number = 1
  ) => {
    if (text) {
      // As Card width increases, font size increases
      //  - if numerator = cardWidth, then text length has no affect
      let numerator = cardWidthEffectStrength * Math.pow(cardWidth, 1.25);
      // numerator = cardWidth;
      // As Text Length increases, font size decreases
      //  - if denominator = 1, then text length has no affect
      let denominator = textLengthEffectStrength * text.length * 0.5;
      // denominator = 1;

      const size = numerator / denominator;
      // const fontSize = `clamp(1%, ${size}%, 100%)`;
      const fontSize = `${size}%`;
      return fontSize;
    } else {
      return "100%";
    }
  };

  const headerFontSize = calculateFontSize(props.card?.name ?? "");
  const descriptionFontSize = calculateFontSize(
    props.card?.description,
    1,
    0.9
  );

  const headerStyles: React.CSSProperties = {
    fontSize: headerFontSize,
    // fontSize: calculateFontSize(props.card?.name ?? "", 6, 0.8),
    width: "100%",
    fontWeight: "bold",
  };

  const descriptionStyles: React.CSSProperties = {
    fontSize: `clamp(1%, ${descriptionFontSize}, calc(${headerFontSize} / 1.2)`, // Adjust the min, max, and scaling values as needed
    // fontSize: calculateFontSize(props.card?.description, 1, 0.1),
  };

  return (
    <Card style={cardStyles}>
      <CardMedia component="img" image={card.image} style={cardMediaStyles} />
      <CardContent style={gridContainerStyles}>
        <Grid container direction="column" style={gridRowStyles}>
          {!props.played && (
            <Grid item>
              <Typography variant="h6" style={headerStyles}>
                {props.card?.name}
                {/* {header} */}
              </Typography>
            </Grid>
          )}

          {!props.played && (
            <Grid item style={gridRowStyles}>
              <Typography variant="body1" style={descriptionStyles}>
                {props.card?.description}
              </Typography>
            </Grid>
          )}

          <Grid item container style={{ minHeight: "1.3em" }}>
            {props.card?.type == "Spawn" && (
              <>
                <Grid item xs={6}>
                  <Typography variant="body2">{attack}</Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  style={{
                    color:
                      (props.card as SpawnCard).totalHealth > health
                        ? "red"
                        : "inherit",
                  }}
                >
                  <Typography variant="body2">{health}</Typography>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
