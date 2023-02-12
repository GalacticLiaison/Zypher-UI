import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import { useState } from "react";
import { nanoid } from "nanoid";
import { _saveNewGene } from "../../../../api/hooks/Genes/saveNewGene";
import { _saveNewImage } from "../../../../api/hooks/Image/saveNewImage";
import { Gene, GenePropertyTypes } from "../../../../services/gene-service";
import { updateObject } from "../../../../_utils/global-helpers";
import { GeneCard } from "../../../GenePod/components/GeneCard/GeneCard";
import { ContentTypeName } from "../ContentShowcase";

interface INewContentItemProps {
  contentTypeName: ContentTypeName;
  open: boolean;
  handleClose: any;
  toggleSnackBar: (isOpen?: boolean) => void;
}

export const NewContentItem = (props: INewContentItemProps) => {
  const [geneToSave, setGeneToSave] = useState<Gene | undefined>({} as Gene);
  const [imageToSave, setImageToSave] = useState<FormData | undefined>(
    {} as FormData
  );
  const saveNewGene = _saveNewGene();
  const saveNewImage = _saveNewImage();

  function updatedGeneImage(geneImage: FormData) {
    setImageToSave(geneImage);
  }

  function updatedGeneProperty(
    propertyName: keyof Gene,
    value: GenePropertyTypes
  ) {
    if (geneToSave == undefined) return;
    setGeneToSave(updateObject(geneToSave, propertyName, value));
  }

  const handleSave = () => {
    if (geneToSave != undefined) {
      geneToSave.id = nanoid();
      setGeneToSave(geneToSave);
      saveNewGene.mutate(geneToSave);
    }
    if (imageToSave != undefined) {
      saveNewImage.mutate(imageToSave);
    }
    props.toggleSnackBar();
    props.handleClose();
  };

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>Create New {props.contentTypeName}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the details for the new {props.contentTypeName}.
          </DialogContentText>
          <GeneCard
            isEdit={true}
            updatedGeneProperty={updatedGeneProperty}
            updatedGeneImage={updatedGeneImage}
          ></GeneCard>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={props.handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color="success" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
