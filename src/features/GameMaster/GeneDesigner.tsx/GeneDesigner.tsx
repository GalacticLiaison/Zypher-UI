import { Button, Grid } from "@mui/material";
import { useState } from "react";
import { saveNewGene } from "../../../api/hooks/saveNewGene";
import { Gene } from "../../../services/gene-service";
import { GeneCard } from "../../GenePod/components/GeneCard/GeneCard";

interface IGeneDesignerProps {
  gene?: Gene;
}

export const GeneDesigner = (props: IGeneDesignerProps) => {
  const [gene, setGene] = useState(props.gene);
  const [isEdit, setIsEdit] = useState(false);
  const saveGene = saveNewGene();

  const toggleIsEdit = () => {
    setIsEdit(!isEdit);
  };

  const saveEditedGene = () => {
    // HERE
    // const gene: Gene = {
    //   id: "1",
    //   name: "Gene 1",
    //   description: "Gene 1 Description",
    //   rarity: "Common",
    //   speciesId: "1",
    //   discovered: true,
    //   xenogenCost: {
    //     common: 1,
    //     rare: 2,
    //     epic: 3,
    //     legendary: 4,
    //   },
    //   strains: [
    //     {
    //       id: "1",
    //       name: "Strain 1",
    //       description: "Strain 1 Description",
    //       rarity: "Common",
    //       geneId: "1",
    //       discovered: true,
    //       possibleMutations: [],
    //       image: "",
    //     },
    //   ],
    //   image: "",
    // };
    // saveGene.mutate(gene);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <GeneCard gene={gene} isEdit={isEdit}></GeneCard>
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
  );
};
