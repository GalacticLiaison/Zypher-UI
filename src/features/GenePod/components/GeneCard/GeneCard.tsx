import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea, Grid, TextField } from "@mui/material";
import { GeneXenogenCost } from "./components/GeneXenogenCost/GeneXenogenCost";
import { useEffect, useState } from "react";
import { GeneImage } from "./components/GeneImage/GeneImage";
import { GeneName } from "./components/GeneName/GeneName";
import { GeneDescription } from "./components/GeneDescription/GeneDescription";
import { Gene, XenogenCost } from "../../../../services/gene-service";

interface IGeneCardProps {
  gene?: Gene;
  isEdit?: boolean;
}

export type SaveGeneProperty = <K extends keyof Gene>(
  value: Gene[K],
  key?: K
) => void;

export const GeneCard = (props: IGeneCardProps) => {
  const [gene, setGene] = useState<Gene | undefined>(props.gene);
  const [geneToSave, setGeneToSave] = useState<Gene | undefined>(props.gene);
  const [isEdit, setIsEdit] = useState(props.isEdit ?? false);
  useEffect(() => {
    if (props.isEdit == undefined) return;
    setIsEdit(props.isEdit);
  }, [props.isEdit]);

  function saveGeneProperty<K extends keyof Gene>(value: Gene[K], key?: K) {
    if (geneToSave == undefined) return;
    console.log("Key: ", key);
    console.log("Value: ", value);
    const theKey = key || (value as unknown as K);
    geneToSave[theKey] = value;
    setGeneToSave(geneToSave);
  }

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
            saveGeneImage={saveGeneProperty}
          ></GeneImage>
          <CardContent>
            <GeneName
              name={gene?.name}
              isEdit={isEdit}
              saveGeneName={saveGeneProperty}
            ></GeneName>
            <GeneXenogenCost
              gene={gene}
              isEdit={isEdit}
              saveGeneXenogenCost={saveGeneProperty}
            ></GeneXenogenCost>
            <GeneDescription
              isEdit={isEdit}
              description={gene?.description}
              saveGeneDescription={saveGeneProperty}
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
