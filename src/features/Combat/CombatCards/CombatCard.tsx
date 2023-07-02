import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useEffect, useRef, useState } from "react";
import { ContentDescription } from "../../../global-components/ContentDescription/ContentDescription";
import {
  ContentImage,
  UpdateImage,
} from "../../../global-components/ContentImage/ContentImage";
import { ContentName } from "../../../global-components/ContentName/ContentName";
import CardMedia from "@mui/material/CardMedia";
import { Grid } from "@mui/material";

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
  card?: CombatCard;
  isEdit?: boolean;
  updateCardProperty?: UpdateCardProperty;
  updateImage?: UpdateImage;
  played?: boolean;
  size?: { height: number | string; maxWidth: number | string };
}

export const CombatCard = (props: ICombatCardProps) => {
  const [card, setCard] = useState<CombatCard>(props.card ?? newCard);
  useEffect(() => {
    if (props.card == undefined) return;
    setCard(props.card);
  }, [props.card]);

  const [isEdit, setIsEdit] = useState(props.isEdit ?? false);
  useEffect(() => {
    if (props.isEdit == undefined) return;
    setIsEdit(props.isEdit);
  }, [props.isEdit]);

  return (
    <div
      style={{
        maxWidth: props.size ? props.size.maxWidth : 345,
        height: props.size ? props.size.height : "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          maxWidth: "70%",
          maxHeight: "100%",
          height: "100%",
          boxShadow:
            "0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23)" /* Shadow */,
          // overflow: "hidden",
          // display: "flex",
          // flexDirection: "column",
        }}
      >
        <CardMedia component="img" image={card.image} />
        <CardContent>
          <ContentName
            name={card?.name}
            isEdit={isEdit}
            updateName={props.updateCardProperty}
            contentType="Gene"
            style={props.played ? { fontSize: ".75em" } : {}}
          ></ContentName>
          {props.played ? (
            <></>
          ) : (
            <ContentDescription
              isEdit={isEdit}
              description={card?.description}
              updateDescription={props.updateCardProperty}
              contentType="Gene"
            ></ContentDescription>
          )}

          {props.card?.type == "Spawn" ? (
            <Grid container justifyContent={"space-between"}>
              <Grid item xs={6}>
                2
              </Grid>
              <Grid item xs={6}>
                100
              </Grid>
            </Grid>
          ) : (
            <></>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
