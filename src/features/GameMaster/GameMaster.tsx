import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { Gene } from "../../services/gene-service";
import { GeneDesigner } from "./GeneDesigner.tsx/GeneDesigner";
import { NewGene } from "./GeneDesigner.tsx/components/NewGene/NewGene";
import { _getAllGenes } from "../../api/hooks/Genes/getAllGenes";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { GeneCardSkeleton } from "../GenePod/components/GeneCard/components/GeneCardSkeleton/GeneCardSkeleton";

interface IGameMasterProps {}

export const GameMaster = (props: IGameMasterProps) => {
  const { data, isLoading } = _getAllGenes();
  useEffect(() => {
    if (!data) return;
    setGenes(data);
  }, [data]);

  const [genes, setGenes] = useState<Gene[]>([] as Gene[]);

  const [openNewGene, setOpenNewGene] = useState(false);
  const handleGeneModalOpen = () => setOpenNewGene(true);
  const handleGeneModalClose = () => setOpenNewGene(false);

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

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="info"
            onClick={handleGeneModalOpen}
          >
            + Add Gene
          </Button>
          <NewGene
            open={openNewGene}
            handleClose={handleGeneModalClose}
            toggleSnackBar={toggleSnackBar}
          ></NewGene>
        </Grid>

        {isLoading
          ? [...Array(6)].map((value, index) => (
              <Grid item xs={4} key={index}>
                <GeneCardSkeleton></GeneCardSkeleton>
              </Grid>
            ))
          : genes.map((gene) => (
              <Grid item xs={4} key={gene.id}>
                <GeneDesigner
                  gene={gene}
                  toggleSnackBar={toggleSnackBar}
                ></GeneDesigner>
              </Grid>
            ))}
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
