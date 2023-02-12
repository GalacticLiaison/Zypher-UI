import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { Perk } from "../../../services/character-service/Character";
import { Gene } from "../../../services/gene-service";
import { Mutation } from "../../../services/mutation-service";
import { Designer } from "./components/Designer";
import { getContent } from "./services/content-data-service";
import { ContentSkeleton } from "./components/ContentSkeleton";
import { NewContentItem } from "./components/NewContentItem";

interface IContentShowcaseProps {
  contentType: ContentTypeName;
  toggleSnackBar: () => void;
}

export type ContentTypeName = "Gene" | "Mutation" | "Perk";
export type ContentType = Gene | Mutation | Perk;

export const ContentShowcase = (props: IContentShowcaseProps) => {
  const { data, isLoading } = getContent(props.contentType)();
  useEffect(() => {
    if (!data) return;
    setContent(data as ContentType[]);
  }, [data]);

  const [content, setContent] = useState([] as ContentType[]);

  const [openNewItem, setOpenNewItem] = useState(false);
  const handleItemModalOpen = () => setOpenNewItem(true);
  const handleItemModalClose = () => setOpenNewItem(false);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Button variant="contained" color="info" onClick={handleItemModalOpen}>
          + Add {props.contentType}
        </Button>
        <NewContentItem
          contentTypeName={props.contentType}
          open={openNewItem}
          handleClose={handleItemModalClose}
          toggleSnackBar={props.toggleSnackBar}
        ></NewContentItem>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={1}>
          {isLoading
            ? [...Array(6)].map((value, index) => (
                <Grid item xs={4} key={index}>
                  <ContentSkeleton contentType="Gene"></ContentSkeleton>
                </Grid>
              ))
            : content.map((contentItem) => (
                <Grid item xs={4} key={contentItem.id}>
                  <Designer
                    contentTypeName={props.contentType}
                    contentItem={contentItem}
                    toggleSnackBar={props.toggleSnackBar}
                  ></Designer>
                </Grid>
              ))}
        </Grid>
      </Grid>
    </Grid>
  );
};
