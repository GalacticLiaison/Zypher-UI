import { CardMedia, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import { useState } from "react";

interface IGeneDesignerProps {
  item: any;
}

export const GeneDesigner = (props: IGeneDesignerProps) => {
  const [item, setItem] = useState(props.item);

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
