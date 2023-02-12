import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Gene, GenePropertyTypes } from "../../../../services/gene-service";
import { _updateGene } from "../../../../api/hooks/Genes/updateGene";
import { _saveNewImage } from "../../../../api/hooks/Image/saveNewImage";
import { updateObject } from "../../../../_utils/global-helpers";
import { ContentType, ContentTypeName } from "../ContentShowcase";
import { saveNewImage, _updateContent } from "../services/content-data-service";
import { determineContentItem } from "../services/component-picker-service";

interface IDesignerProps {
  contentTypeName: ContentTypeName;
  contentItem?: ContentType;
  toggleSnackBar: () => void;
}

export const Designer = (props: IDesignerProps) => {
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
  const [imageToUpdate, setImageToUpdate] = useState<FormData | undefined>(
    undefined
  );
  // ---------------

  const updateContent = _updateContent(props.contentTypeName)();
  // const { data, isLoading } = getContent(props.contentType)();

  function updateImage(geneImage: FormData) {
    if (imageToUpdate == undefined) return;
    setImageToUpdate(geneImage);
  }

  function updateProperty<T>(propertyName: keyof T, value: GenePropertyTypes) {
    if (itemToUpdate == undefined) return;

    switch (props.contentTypeName) {
      case "Gene":
        setItemToUpdate(
          updateObject(itemToUpdate as Gene, propertyName as keyof Gene, value)
        );
        break;
      default:
        break;
    }
  }

  const toggleIsEdit = () => {
    setIsEdit(!isEdit);
  };

  const saveEditedGene = () => {
    if (itemToUpdate == undefined) return;
    if (updateContent != undefined) updateContent.mutate(itemToUpdate);
    if (imageToUpdate != undefined) saveNewImage(imageToUpdate);
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
  ) : (
    <></>
  );
};
