import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Gene } from "../../../../../../services/gene-service";
import { SaveGeneProperty } from "../../../../../GameMaster/GeneDesigner.tsx/GeneDesigner";
import { XenoTypeCost } from "./components/XenoTypeCost/XenoTypeCost";

interface IXenogenCostProps {
  gene?: Gene;
  isEdit?: boolean;
  saveGeneXenogenCost?: SaveGeneProperty;
}

export const GeneXenogenCost = (props: IXenogenCostProps) => {
  console.log("GeneXenogenCost: ", props.gene?.xenogenCost);
  const [isEdit, setIsEdit] = useState(props.isEdit ?? false);
  useEffect(() => {
    if (!props.isEdit) return;
    setIsEdit(props.isEdit);
  }, [props.isEdit]);

  const [gene, setGene] = useState(props.gene);

  const updateXenogenCost = (value: number, type: string) => {
    if (gene == undefined) return;
    switch (type) {
      case "common":
        gene.xenogenCost.common = value;
        break;
      case "rare":
        gene.xenogenCost.rare = value;
        break;
      case "epic":
        gene.xenogenCost.epic = value;
        break;
      case "legendary":
        gene.xenogenCost.legendary = value;
        break;
    }
    setGene(gene);

    if (props.saveGeneXenogenCost)
      props.saveGeneXenogenCost("xenogenCost", gene.xenogenCost);
  };

  return (
    <Typography
      sx={{ marginTop: isEdit ? 2 : 0 }}
      gutterBottom
      variant="subtitle1"
      component="div"
    >
      <Grid container spacing={3}>
        <Grid item xs={3}>
          Cost:
        </Grid>
        {((gene && gene.xenogenCost.common > 0) || isEdit) && (
          <Grid item xs={isEdit ? 12 : 2}>
            <XenoTypeCost
              isEdit={isEdit}
              cost={gene?.xenogenCost}
              type="common"
              updateXenogenCost={updateXenogenCost}
            ></XenoTypeCost>
          </Grid>
        )}
        {((gene && gene.xenogenCost.rare > 0) || isEdit) && (
          <Grid item xs={isEdit ? 12 : 2}>
            <XenoTypeCost
              isEdit={isEdit}
              cost={gene?.xenogenCost}
              type="rare"
              updateXenogenCost={updateXenogenCost}
            ></XenoTypeCost>
          </Grid>
        )}
        {((gene && gene.xenogenCost.epic > 0) || isEdit) && (
          <Grid item xs={isEdit ? 12 : 2}>
            <XenoTypeCost
              isEdit={isEdit}
              cost={gene?.xenogenCost}
              type="epic"
              updateXenogenCost={updateXenogenCost}
            ></XenoTypeCost>
          </Grid>
        )}
        {((gene && gene.xenogenCost.legendary > 0) || isEdit) && (
          <Grid item xs={isEdit ? 12 : 2}>
            <XenoTypeCost
              isEdit={isEdit}
              cost={gene?.xenogenCost}
              type="legendary"
              updateXenogenCost={updateXenogenCost}
            ></XenoTypeCost>
          </Grid>
        )}
      </Grid>
    </Typography>
  );
};
