import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Rarity } from "../../../../../../../services/rarity-service";

interface IMutationRarityProps {
  rarity: Rarity;
}

export const MutationRarity = (props: IMutationRarityProps) => {
  const [rarity, setRarity] = useState(props.rarity);
  useEffect(() => {
    setRarity(props.rarity);
  }, [props.rarity]);

  const rarityColor = () => {
    switch (rarity) {
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
    <Typography gutterBottom variant="caption" component="div">
      <Chip label={rarity} color={rarityColor()} variant="outlined" />
    </Typography>
  );
};
