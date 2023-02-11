import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Chip } from "@mui/material";
import { Mutation } from "../../../../../services/mutation-service";
import { useEffect, useState } from "react";

interface IMutationCardProps {
  mutation: Mutation;
  selectMutation: (mutation: Mutation) => void;
}

export const MutationCard = (props: IMutationCardProps) => {
  const [mutation, setMutation] = useState<Mutation>(props.mutation);
  useEffect(() => {
    setMutation(props.mutation);
  }, [props.mutation]);

  const handleClick = () => {
    props.selectMutation(mutation);
  };

  const rarityColor = () => {
    switch (mutation.rarity) {
      case "Common":
        return "success";
      case "Rare":
        return "info";
      case "Epic":
        return "secondary";
      case "Legendary":
        return "warning";
    }
  };

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
      onClick={handleClick}
    >
      <CardActionArea>
        <CardMedia component="img" image={mutation.image} alt="Human Hand" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {mutation.name}
          </Typography>
          <Typography gutterBottom variant="caption" component="div">
            <Chip
              label={mutation.rarity}
              color={rarityColor()}
              variant="outlined"
            />
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {mutation.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
