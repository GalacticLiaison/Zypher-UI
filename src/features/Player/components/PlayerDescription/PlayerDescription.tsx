import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Player } from "../../../../services/character-service/character-factory";
import { describeEyeTypes } from "./Eyes/Eyes";

interface IPlayerDescriptionProps {
  player: Player;
}

export const PlayerDescription = (props: IPlayerDescriptionProps) => {
  const [player, setPlayer] = useState<Player>(props.player);
  useEffect(() => {
    setPlayer(props.player);
  }, [props.player]);

  return (
    <Typography variant="body2">
      {/* HEAD */}
      You are a {player.morphology.gender} """Human""". Your face looks{" "}
      {player.morphology.head.face}. You have{" "}
      {player.morphology.head.eyes.length}{" "}
      {describeEyeTypes(player.morphology.head.eyes)} eyes,{" "}
      {player.morphology.head.ears} ears, and{" "}
      {player.morphology.head.hair.color} {player.morphology.head.hair.style}{" "}
      hair.
      {/* TORSO */}
      Your torso is {player.morphology.torso.type}. You have{" "}
      {player.morphology.torso.arms.length} arms, and a{" "}
      {player.morphology.torso.back} back.
      {/* BOTTOM */}
      Your bottom is {player.morphology.bottom.type}. You have{" "}
      {player.morphology.bottom.legs.length} legs.
      {/* SKIN */}
      Your skin is {player.morphology.skin.color} and{" "}
      {player.morphology.skin.type}.{/* MUSCLE */}
      Your muscles are {player.morphology.muscle.size} and{" "}
      {player.morphology.muscle.tone} toned.
    </Typography>
  );
};
