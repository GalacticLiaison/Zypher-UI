import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { getAllGenes } from "../../api/hooks/getAllGenes";
import { Gene } from "../../services/gene-service";
import { GeneDesigner } from "./GeneDesigner.tsx/GeneDesigner";
import { NewGene } from "./GeneDesigner.tsx/components/NewGene/NewGene";

interface IGameMasterProps {}

export const GameMaster = (props: IGameMasterProps) => {
  const { data, isLoading } = getAllGenes();
  useEffect(() => {
    if (!data) return;
    setGenes(data);
  }, [data]);

  const [genes, setGenes] = useState<Gene[]>([] as Gene[]);

  const [openNewGeneModal, setNewGeneModal] = useState(false);
  const handleGeneModalOpen = () => setNewGeneModal(true);
  const handleGeneModalClose = () => setNewGeneModal(false);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Button variant="contained" color="info" onClick={handleGeneModalOpen}>
          + Add Gene
        </Button>
        <NewGene
          open={openNewGeneModal}
          handleClose={handleGeneModalClose}
        ></NewGene>
      </Grid>

      {genes.map((gene) => (
        <Grid item xs={4} key={gene.id}>
          <GeneDesigner gene={gene}></GeneDesigner>
        </Grid>
      ))}
    </Grid>
  );
};
