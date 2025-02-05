import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";
import { GeneXenogenCost } from "./components/GeneXenogenCost/GeneXenogenCost";
import { useEffect, useState } from "react";
import { Gene, GenePropertyTypes } from "../../../../services/gene-service";
import {
  ContentImage,
  UpdateImage,
} from "../../../../global-components/ContentImage/ContentImage";
import { ContentName } from "../../../../global-components/ContentName/ContentName";
import { ContentDescription } from "../../../../global-components/ContentDescription/ContentDescription";

const newGene: Gene = {
  id: "",
  name: "",
  description: "",
  rarity: "Common",
  speciesId: "",
  discovered: false,
  xenogenCost: {
    common: 0,
    rare: 0,
    epic: 0,
    legendary: 0,
  },
  strains: [],
  image: "src/assets/genes/UnknownGene.png",
};

export type UpdateGeneProperty = (
  propertyName: keyof Gene,
  value: GenePropertyTypes
) => void;

interface IGeneCardProps {
  gene?: Gene;
  isEdit?: boolean;
  updateGeneProperty?: UpdateGeneProperty;
  updateImage?: UpdateImage;
}

export const GeneCard = (props: IGeneCardProps) => {
  const [gene, setGene] = useState<Gene>(props.gene ?? newGene);
  useEffect(() => {
    if (props.gene == undefined) return;
    setGene(props.gene);
  }, [props.gene]);

  const [isEdit, setIsEdit] = useState(props.isEdit ?? false);
  useEffect(() => {
    if (props.isEdit == undefined) return;
    setIsEdit(props.isEdit);
  }, [props.isEdit]);

  const cardContent = (
    <>
      <ContentImage
        image={gene?.image}
        name={gene?.name}
        isEdit={isEdit}
        updateImage={props?.updateImage}
        contentType="Gene"
      ></ContentImage>
      <CardContent>
        <ContentName
          name={gene?.name}
          isEdit={isEdit}
          updateName={props.updateGeneProperty}
          contentType="Gene"
        ></ContentName>
        <GeneXenogenCost
          gene={gene}
          isEdit={isEdit}
          updateGeneXenogenCost={props.updateGeneProperty}
        ></GeneXenogenCost>
        <ContentDescription
          isEdit={isEdit}
          description={gene?.description}
          updateDescription={props.updateGeneProperty}
          contentType="Gene"
        ></ContentDescription>
      </CardContent>
    </>
  );

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
      {isEdit ? cardContent : <CardActionArea>{cardContent}</CardActionArea>}
    </Card>
  );
};
