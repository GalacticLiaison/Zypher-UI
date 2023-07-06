import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Gene, GenePropertyTypes } from "../../../../services/gene-service";
import { updateObject } from "../../../../_utils/global-helpers";
import { ContentType, ContentTypeName } from "../ContentShowcase";
import { _updateContent } from "../services/content-data-service";
import { determineContentItem } from "../services/component-picker-service";
import { ContentPropertyTypes } from "./NewContentItem";
import {
  Mutation,
  MutationPropertyTypes,
} from "../../../../services/mutation-service";
import {
  Perk,
  PerkPropertyTypes,
} from "../../../../services/character-service/Character";
import { _saveNewImage } from "../../../../api/hooks/Image/saveNewImage";
import { Image } from "../../../../api/image-api";

interface IContentDesignerProps {
  contentTypeName: ContentTypeName;
  contentItem?: ContentType;
  toggleSnackBar: () => void;
}

export const ContentDesigner = (props: IContentDesignerProps) => {
  const [contentItem, setContentItem] = useState(props.contentItem);
  useEffect(() => {
    if (props.contentItem == undefined) return;
    setContentItem(props.contentItem);
  }, [props.contentItem]);

  // ----- Edit mode
  const [isEdit, setIsEdit] = useState(false);
  const [itemToUpdate, setItemToUpdate] = useState<ContentType | undefined>(
    props.contentItem
  );
  const [imageToUpdate, setImageToUpdate] = useState<Image | undefined>(
    undefined
  );
  // ---------------

  const updateContent = _updateContent(props.contentTypeName)();
  const saveNewImage = _saveNewImage();

  function updateImage(geneImage: Image) {
    setImageToUpdate(geneImage);
  }

  function updateProperty<T>(
    propertyName: keyof T,
    value: ContentPropertyTypes
  ) {
    if (itemToUpdate == undefined) return;

    switch (props.contentTypeName) {
      case "Gene":
        setItemToUpdate(
          updateObject(
            itemToUpdate as Gene,
            propertyName as keyof Gene,
            value as GenePropertyTypes
          )
        );
        break;
      case "Mutation":
        setItemToUpdate(
          updateObject(
            itemToUpdate as Mutation,
            propertyName as keyof Mutation,
            value as MutationPropertyTypes
          )
        );
        break;
      case "Perk":
        setItemToUpdate(
          updateObject(
            itemToUpdate as Perk,
            propertyName as keyof Perk,
            value as PerkPropertyTypes
          )
        );
        break;
      default:
        break;
    }
  }

  const toggleIsEdit = () => {
    setIsEdit(!isEdit);
  };

  const saveEditedItem = () => {
    if (itemToUpdate == undefined) return;
    if (imageToUpdate != undefined) {
      const updatedImageUrl = `src/assets/${props.contentTypeName.toLowerCase()}s/${
        imageToUpdate?.name
      }`;
      itemToUpdate.image = updatedImageUrl;
    }

    if (updateContent != undefined) updateContent.mutate(itemToUpdate);
    if (imageToUpdate != undefined) {
      saveNewImage.mutate(imageToUpdate);
    }
    setIsEdit(false);

    props.toggleSnackBar();
  };

  return contentItem ? (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {determineContentItem(props.contentTypeName)(
          contentItem,
          isEdit,
          updateProperty,
          updateImage
        )}
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
          <Button variant="contained" color="success" onClick={saveEditedItem}>
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
  ) : (
    <></>
  );
};
