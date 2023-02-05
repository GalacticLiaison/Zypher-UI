import { GeneCard } from "../../../../GenePod/components/GeneCard/GeneCard";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import { useState } from "react";
import { Gene, GenePropertyTypes } from "../../../../../services/gene-service";
import { updateObject } from "../../../../../_utils/global-helpers";
import { _saveNewGene } from "../../../../../api/hooks/Genes/saveNewGene";
import { _saveNewImage } from "../../../../../api/hooks/Image/saveNewImage";
import { nanoid } from "nanoid";

interface INewGeneProps {
  open: boolean;
  handleClose: any;
  toggleSnackBar: (isOpen?: boolean) => void;
}

export const NewGene = (props: INewGeneProps) => {
  const [geneToSave, setGeneToSave] = useState<Gene | undefined>({} as Gene);
  const [imageToSave, setImageToSave] = useState<FormData | undefined>(
    {} as FormData
  );
  const saveNewGene = _saveNewGene();
  const saveNewImage = _saveNewImage();

  function updatedGeneImage(geneImage: FormData) {
    console.log("updatedGeneImage: ", geneImage);

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
      console.log("imageToSave: ", imageToSave);
      saveNewImage.mutate(imageToSave);
    }
    props.toggleSnackBar();
    props.handleClose();
  };

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

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>Create New Gene</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the details for the new gene.
          </DialogContentText>
          <GeneCard
            isEdit={true}
            gene={newGene}
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
