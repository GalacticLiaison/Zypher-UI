import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useEffect, useRef, useState } from "react";
import { ContentDescription } from "../../../global-components/ContentDescription/ContentDescription";
import {
  ContentImage,
  UpdateImage,
} from "../../../global-components/ContentImage/ContentImage";
import { ContentName } from "../../../global-components/ContentName/ContentName";

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

type CombatCardType = "Action" | "Spawn" | "Reaction";

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
    <Card
      sx={{
        maxWidth: 345,
        height: 480,
        boxShadow:
          "0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23)" /* Shadow */,
        overflow: "scroll",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        "&::MsOverflowStyle": "none",
        "&::scrollbarWidth": "none",
      }}
    >
      <ContentImage
        image={card?.image}
        name={card?.name}
        isEdit={isEdit}
        updateImage={props?.updateImage}
        contentType="Gene"
      ></ContentImage>
      <CardContent>
        <ContentName
          name={card?.name}
          isEdit={isEdit}
          updateName={props.updateCardProperty}
          contentType="Gene"
        ></ContentName>
        <ContentDescription
          isEdit={isEdit}
          description={card?.description}
          updateDescription={props.updateCardProperty}
          contentType="Gene"
        ></ContentDescription>
      </CardContent>
    </Card>
  );
};
