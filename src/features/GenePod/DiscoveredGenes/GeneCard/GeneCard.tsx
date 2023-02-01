import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid } from "@mui/material";
import { Gene } from "../../../../services/gene-service";
import { XenogenBlob } from "./XenogenBlob";

interface IGeneCardProps {
  gene: Gene;
}

export const GeneCard = (props: IGeneCardProps) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        height: 480,
        boxShadow:
          "0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23)" /* Shadow */,
        overflow: "scroll",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        "&::MsOverflowStyle": "none",
        "&::scrollbarWidth": "none",
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          // height="400"
          image={props.gene.image}
          alt={props.gene.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.gene.name}
            <Typography gutterBottom variant="subtitle1" component="div">
              {createCostElement(props.gene)}
            </Typography>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.gene.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const createCostElement = (gene: Gene) => {
  const xenogenCost = (
    <Grid container spacing={3}>
      <Grid item xs={3}>
        Cost:
      </Grid>
      {gene.xenogenCost.standard > 0 && (
        <Grid item xs={2}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              {gene.xenogenCost.standard}
            </Grid>
            <Grid item xs={6}>
              <XenogenBlob type="standard" size={25}></XenogenBlob>
            </Grid>
          </Grid>
        </Grid>
      )}
      {gene.xenogenCost.rare > 0 && (
        <Grid item xs={2}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              {gene.xenogenCost.rare}
            </Grid>
            <Grid item xs={6}>
              <XenogenBlob type="rare" size={25}></XenogenBlob>
            </Grid>
          </Grid>
        </Grid>
      )}
      {gene.xenogenCost.epic > 0 && (
        <Grid item xs={2}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              {gene.xenogenCost.epic}
            </Grid>
            <Grid item xs={6}>
              <XenogenBlob type="epic" size={25}></XenogenBlob>
            </Grid>
          </Grid>
        </Grid>
      )}
      {gene.xenogenCost.legendary > 0 && (
        <Grid item xs={2}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              {gene.xenogenCost.legendary}
            </Grid>
            <Grid item xs={6}>
              <XenogenBlob type="legendary" size={25}></XenogenBlob>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );

  return xenogenCost;
};
