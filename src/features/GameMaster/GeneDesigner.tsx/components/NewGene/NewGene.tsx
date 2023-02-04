import { GeneCard } from "../../../../GenePod/components/GeneCard/GeneCard";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import { useState } from "react";
import { Gene, GenePropertyTypes } from "../../../../../services/gene-service";
import { Image } from "../../../../../api/image-api";
import { updateObject } from "../../../../../_utils/global-helpers";
import { _saveNewGene } from "../../../../../api/hooks/Genes/saveNewGene";
import { _saveNewImage } from "../../../../../api/hooks/Image/saveNewImage";
import { nanoid } from "nanoid";

interface INewGeneProps {
  open: boolean;
  handleClose: any;
  toggleSnackBar: () => void;
}

export const NewGene = (props: INewGeneProps) => {
  const [geneToSave, setGeneToSave] = useState<Gene | undefined>({} as Gene);
  const [imageToSave, setImageToSave] = useState<Image | undefined>(undefined);
  const saveNewGene = _saveNewGene();
  const saveNewImage = _saveNewImage();

  function updatedGeneImage(geneImage: Image) {
    if (imageToSave == undefined) return;
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
      console.log("SAVING THIS: ", geneToSave);
      saveNewGene.mutate(geneToSave);
    }

    if (imageToSave != undefined) saveNewImage.mutate(imageToSave);

    if (saveNewGene.isSuccess && saveNewImage.isSuccess) props.toggleSnackBar();
    props.handleClose();
  };

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
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
