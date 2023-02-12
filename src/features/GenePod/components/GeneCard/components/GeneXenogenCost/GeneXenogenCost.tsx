import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Gene, XenogenCost } from "../../../../../../services/gene-service";
import { UpdateGeneProperty } from "../../GeneCard";
import { XenoTypeCost } from "./components/XenoTypeCost/XenoTypeCost";

interface IXenogenCostProps {
  gene?: Gene;
  isEdit?: boolean;
  updateGeneXenogenCost?: UpdateGeneProperty;
}

export const GeneXenogenCost = (props: IXenogenCostProps) => {
  const [isEdit, setIsEdit] = useState(props.isEdit ?? false);
  useEffect(() => {
    if (!props.isEdit) return;
    setIsEdit(props.isEdit);
  }, [props.isEdit]);

  const [gene, setGene] = useState(props.gene);

  const updateXenogenCost = (value: number, type: string) => {
    if (gene == undefined) return;
    if (gene.xenogenCost == undefined) gene.xenogenCost = {} as XenogenCost;
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

    if (props.updateGeneXenogenCost)
      props.updateGeneXenogenCost("xenogenCost", gene.xenogenCost);
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
        {((gene && gene.xenogenCost?.common > 0) || isEdit) && (
          <Grid item xs={isEdit ? 12 : 2}>
            <XenoTypeCost
              isEdit={isEdit}
              cost={gene?.xenogenCost?.common}
              type="common"
              updateXenogenCost={updateXenogenCost}
            ></XenoTypeCost>
          </Grid>
        )}
        {((gene && gene.xenogenCost?.rare > 0) || isEdit) && (
          <Grid item xs={isEdit ? 12 : 2}>
            <XenoTypeCost
              isEdit={isEdit}
              cost={gene?.xenogenCost?.rare}
              type="rare"
              updateXenogenCost={updateXenogenCost}
            ></XenoTypeCost>
          </Grid>
        )}
        {((gene && gene.xenogenCost?.epic > 0) || isEdit) && (
          <Grid item xs={isEdit ? 12 : 2}>
            <XenoTypeCost
              isEdit={isEdit}
              cost={gene?.xenogenCost?.epic}
              type="epic"
              updateXenogenCost={updateXenogenCost}
            ></XenoTypeCost>
          </Grid>
        )}
        {((gene && gene.xenogenCost?.legendary > 0) || isEdit) && (
          <Grid item xs={isEdit ? 12 : 2}>
            <XenoTypeCost
              isEdit={isEdit}
              cost={gene?.xenogenCost?.legendary}
              type="legendary"
              updateXenogenCost={updateXenogenCost}
            ></XenoTypeCost>
          </Grid>
        )}
      </Grid>
    </Typography>
  );
};
