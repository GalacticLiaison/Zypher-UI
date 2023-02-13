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
import { ContentType, ContentTypeName } from "../ContentShowcase";
import { determineContentItem } from "../services/component-picker-service";
import {
  Mutation,
  MutationPropertyTypes,
} from "../../../../services/mutation-service";
import {
  Perk,
  PerkPropertyTypes,
} from "../../../../services/character-service/Character";
import { _saveNewContent } from "../services/content-data-service";

export type ContentPropertyTypes =
  | GenePropertyTypes
  | MutationPropertyTypes
  | PerkPropertyTypes;

interface INewContentItemProps {
  contentTypeName: ContentTypeName;
  open: boolean;
  handleClose: any;
  toggleSnackBar: (isOpen?: boolean) => void;
}

export const NewContentItem = (props: INewContentItemProps) => {
  const [itemToSave, setItemToSave] = useState<ContentType | undefined>(
    {} as ContentType
  );
  const [imageToSave, setImageToSave] = useState<FormData | undefined>(
    {} as FormData
  );
  const saveNewContent = _saveNewContent(props.contentTypeName)();
  const saveNewImage = _saveNewImage();

  function updateImage(geneImage: FormData) {
    setImageToSave(geneImage);
  }

  function updateProperty<T>(
    propertyName: keyof T,
    value: ContentPropertyTypes
  ) {
    if (itemToSave == undefined) return;

    switch (props.contentTypeName) {
      case "Gene":
        setItemToSave(
          updateObject(
            itemToSave as Gene,
            propertyName as keyof Gene,
            value as GenePropertyTypes
          )
        );
        break;
      case "Mutation":
        setItemToSave(
          updateObject(
            itemToSave as Mutation,
            propertyName as keyof Mutation,
            value as MutationPropertyTypes
          )
        );
        break;
      case "Perk":
        setItemToSave(
          updateObject(
            itemToSave as Perk,
            propertyName as keyof Perk,
            value as PerkPropertyTypes
          )
        );
        break;
      default:
        break;
    }
  }

  const handleSave = () => {
    if (itemToSave != undefined) {
      itemToSave.id = nanoid();
      setItemToSave(itemToSave);
      saveNewContent.mutate(itemToSave);
    }
    if (imageToSave != undefined) {
      console.log("IMAGE TO SAVE: ", imageToSave);
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
          {/* <GeneCard
            isEdit={true}
            updatedGeneProperty={updatedGeneProperty}
            updatedGeneImage={updatedGeneImage}
          ></GeneCard> */}
          {determineContentItem(props.contentTypeName)(
            undefined,
            true,
            updateProperty,
            updateImage
          )}
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
