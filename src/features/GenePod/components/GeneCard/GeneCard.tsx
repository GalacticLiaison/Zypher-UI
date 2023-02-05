import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea, Grid, TextField } from "@mui/material";
import { GeneXenogenCost } from "./components/GeneXenogenCost/GeneXenogenCost";
import { useEffect, useState } from "react";
import { GeneImage } from "./components/GeneImage/GeneImage";
import { GeneName } from "./components/GeneName/GeneName";
import { GeneDescription } from "./components/GeneDescription/GeneDescription";
import { Gene } from "../../../../services/gene-service";
import {
  UpdateGeneImage,
  UpdateGeneProperty,
} from "../../../GameMaster/GeneDesigner.tsx/GeneDesigner";

interface IGeneCardProps {
  gene?: Gene;
  isEdit?: boolean;
  updatedGeneProperty?: UpdateGeneProperty;
  updatedGeneImage?: UpdateGeneImage;
}

export const GeneCard = (props: IGeneCardProps) => {
  const [gene, setGene] = useState<Gene | undefined>(props.gene);
  useEffect(() => {
    if (props.gene == undefined) return;
    setGene(props.gene);
  }, [props.gene]);

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
      {isEdit ? (
        <div>
          <GeneImage
            image={gene?.image}
            name={gene?.name}
            isEdit={isEdit}
            updateGeneImage={props?.updatedGeneImage}
          ></GeneImage>
          <CardContent>
            <GeneName
              name={gene?.name}
              isEdit={isEdit}
              updateGeneName={props.updatedGeneProperty}
            ></GeneName>
            <GeneXenogenCost
              gene={gene}
              isEdit={isEdit}
              updateGeneXenogenCost={props.updatedGeneProperty}
            ></GeneXenogenCost>
            <GeneDescription
              isEdit={isEdit}
              description={gene?.description}
              updateGeneDescription={props.updatedGeneProperty}
            ></GeneDescription>
          </CardContent>
        </div>
      ) : (
        <div>
          <CardActionArea>
            <GeneImage image={gene?.image} name={gene?.name}></GeneImage>
            <CardContent>
              <GeneName name={gene?.name} isEdit={isEdit}></GeneName>
              <GeneXenogenCost gene={gene} isEdit={isEdit}></GeneXenogenCost>
              <GeneDescription
                isEdit={isEdit}
                description={gene?.description}
              ></GeneDescription>
            </CardContent>
          </CardActionArea>
        </div>
      )}
    </Card>
  );
};
