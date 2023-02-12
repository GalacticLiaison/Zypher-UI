import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { Gene } from "../../services/gene-service";
import { _getAllGenes } from "../../api/hooks/Genes/getAllGenes";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import ButtonGroup from "@mui/material/ButtonGroup";
import {
  ContentShowcase,
  ContentTypeName,
} from "./ContentShowcase/ContentShowcase";

interface IGameMasterProps {}

export const GameMaster = (props: IGameMasterProps) => {
  // const { data, isLoading } = _getAllGenes();
  // useEffect(() => {
  //   if (!data) return;
  //   setGenes(data);
  // }, [data]);

  const [genes, setGenes] = useState<Gene[]>([] as Gene[]);

  // const [openNewGene, setOpenNewGene] = useState(false);
  // const handleGeneModalOpen = () => setOpenNewGene(true);
  // const handleGeneModalClose = () => setOpenNewGene(false);

  const [snackBarIsOpen, setSnackBarIsOpen] = useState(false);
  const handleSnackBarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBarIsOpen(false);
  };

  const toggleSnackBar = (isOpen?: boolean) => {
    setSnackBarIsOpen(isOpen ?? !snackBarIsOpen);
  };

  const [contentType, setContentType] = useState<ContentTypeName>("Gene");
  const selectContentType = (contentType: ContentTypeName) => {
    setContentType(contentType);
  };

  const contentTypeButtons = [
    <Button key="gene" onClick={() => selectContentType("Gene")}>
      Genes
    </Button>,
    <Button key="mutation" onClick={() => selectContentType("Mutation")}>
      Mutations
    </Button>,
    <Button key="perk" onClick={() => selectContentType("Perk")}>
      Perks
    </Button>,
  ];

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ButtonGroup size="large" aria-label="large button group">
            {contentTypeButtons}
          </ButtonGroup>
        </Grid>
        <Grid item xs={12}>
          <ContentShowcase
            contentType={contentType}
            toggleSnackBar={toggleSnackBar}
          ></ContentShowcase>
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={snackBarIsOpen}
        autoHideDuration={4000}
        onClose={handleSnackBarClose}
      >
        <Alert
          onClose={handleSnackBarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          `Gene saved successfully!`
        </Alert>
      </Snackbar>
    </div>
  );
};
