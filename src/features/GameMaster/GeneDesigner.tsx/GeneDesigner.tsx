import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { saveNewGene } from "../../../api/hooks/saveNewGene";
import { saveNewImage } from "../../../api/hooks/saveNewImage";
import { Gene, GenePropertyTypes } from "../../../services/gene-service";
import { GeneCard } from "../../GenePod/components/GeneCard/GeneCard";
import { Image } from "../../../api/image-api";

interface IGeneDesignerProps {
  gene?: Gene;
}

export type SaveGeneProperty = (
  propertyName: keyof Gene,
  value: GenePropertyTypes
) => void;

export type SaveGeneImage = (image: any) => void;

export const GeneDesigner = (props: IGeneDesignerProps) => {
  const [gene, setGene] = useState(props.gene);
  useEffect(() => {
    if (props.gene == undefined) return;
    setGene(props.gene);
  }, [props.gene]);

  // ----- Edit mode
  const [isEdit, setIsEdit] = useState(false);
  const [geneToSave, setGeneToSave] = useState<Gene | undefined>(props.gene);
  const [imageToSave, setImageToSave] = useState<Image | undefined>(undefined);
  const saveGene = saveNewGene();
  const saveImage = saveNewImage();
  // ---------------

  function saveGeneProperty(
    propertyName: keyof Gene,
    value: GenePropertyTypes
  ) {
    if (geneToSave == undefined) return;
    setGeneToSave(updateObject(geneToSave, propertyName, value));
  }

  function updateObject<T, K extends keyof T>(
    obj: T,
    propertyName: K,
    value: T[K]
  ): T {
    return {
      ...obj,
      [propertyName]: value,
    };
  }

  function saveGeneImage(geneImage: Image) {
    if (imageToSave == undefined) return;
    setImageToSave(geneImage);
  }

  const toggleIsEdit = () => {
    setIsEdit(!isEdit);
  };

  const saveEditedGene = () => {
    console.log("Saving gene: ", geneToSave);
    if (imageToSave != undefined) saveImage.mutate(imageToSave);
    if (geneToSave != undefined) saveGene.mutate(geneToSave);
    setIsEdit(false);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <GeneCard
          gene={gene}
          isEdit={isEdit}
          saveGeneProperty={saveGeneProperty}
          saveGeneImage={saveGeneImage}
        ></GeneCard>
      </Grid>
      {!isEdit && (
        <Grid item xs={5}>
          <Button variant="outlined" color="info" onClick={toggleIsEdit}>
            Edit
          </Button>
        </Grid>
      )}
      {isEdit && (
        <Grid item xs={5}>
          <Button variant="contained" color="success" onClick={saveEditedGene}>
            Save
          </Button>
        </Grid>
      )}
      {isEdit && (
        <Grid item xs={5}>
          <Button variant="contained" color="error" onClick={toggleIsEdit}>
            Cancel
          </Button>
        </Grid>
      )}
      {!isEdit && (
        <Grid item xs={5}>
          <Button variant="outlined" color="error">
            Delete
          </Button>
        </Grid>
      )}
    </Grid>
  );
};
