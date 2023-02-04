import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { Gene } from "../../services/gene-service";
import { GeneDesigner } from "./GeneDesigner.tsx/GeneDesigner";
import { NewGene } from "./GeneDesigner.tsx/components/NewGene/NewGene";
import { _getAllGenes } from "../../api/hooks/Genes/getAllGenes";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

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

  const toggleSnackBar = () => {
    setSnackBarIsOpen(!snackBarIsOpen);
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

        {genes.map((gene) => (
          <Grid item xs={4} key={gene.id}>
            <GeneDesigner
              gene={gene}
              toggleSnackBar={toggleSnackBar}
            ></GeneDesigner>
          </Grid>
        ))}
      </Grid>
      <Snackbar
        open={snackBarIsOpen}
        autoHideDuration={6000}
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
