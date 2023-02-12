import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Chip } from "@mui/material";
import { useEffect, useState } from "react";
import { Perk } from "../../../../services/character-service/Character";

const newPerk: Perk = {
  id: "0",
  name: "",
  description: "",
  appliedStatBonuses: [],
  image: "",
};

interface IPerkCardProps {
  perk?: Perk;
  isEdit?: boolean;
}

export const PerkCard = (props: IPerkCardProps) => {
  const [perk, setPerk] = useState<Perk>(props.perk ?? newPerk);
  useEffect(() => {
    if (props.perk == undefined) return;
    setPerk(props.perk);
  }, [props.perk]);

  return (
    <Card
      sx={
        {
          // maxWidth: 345,
          // height: 480,
          // boxShadow:
          //   "0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23)" /* Shadow */,
          // overflow: "scroll",
          // "&::-webkit-scrollbar": {
          //   display: "none",
          // },
          // "&::MsOverflowStyle": "none",
          // "&::scrollbarWidth": "none",
        }
      }
      //   onClick={handleClick}
    >
      <CardActionArea>
        <CardMedia component="img" image={perk.image} alt="perk image" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {perk.name}
          </Typography>
          {/* <Typography gutterBottom variant="caption" component="div">
            <Chip
              label={perk.rarity}
              color={rarityColor()}
              variant="outlined"
            />
          </Typography> */}
          <Typography variant="body2" color="text.secondary">
            {perk.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
