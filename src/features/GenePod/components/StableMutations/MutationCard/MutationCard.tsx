import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Mutation } from "../../../../services/mutation-service";

interface IMutationCardProps {
  mutation: Mutation;
}

export const MutationCard = (props: IMutationCardProps) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="src/assets/mutations/humanHand.webp"
          alt="Human Hand"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Human Hand
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Back to being a human? How boring.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
