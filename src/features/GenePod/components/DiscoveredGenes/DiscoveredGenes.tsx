import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Gene } from "../../../../services/gene-service";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { GeneCard } from "../GeneCard/GeneCard";
import { getAllGenes } from "../../../../api/hooks/getAllGenes";

// import "./DiscoveredGenes.css";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface IDiscoveredGenesProps {
  open: boolean;
  handleClose: any;
  genes: Gene[];
}

export const DiscoveredGenes = (props: IDiscoveredGenesProps) => {
  // data from API call
  const { data, isLoading } = getAllGenes();
  useEffect(() => {
    if (!data) return;
    setGenes(data);
  }, [data]);

  const [genes, setGenes] = useState<Gene[]>([] as Gene[]);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={props.open}
      onClose={props.handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.open}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Discovered Genes
          </Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            Your collection of genetic material has led to the discovery of the
            following Genes.
          </Typography>
          <Grid container spacing={3}>
            {genes.map((gene) => (
              <Grid item xs={4} key={gene.id}>
                <GeneCard gene={gene} isEdit={false}></GeneCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
};
