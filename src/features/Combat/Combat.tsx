import { isMobile } from "../../services/global-utilities";
import { Battlefield } from "./Battlefield/Battlefield";
import { PlayerHand } from "./PlayerHand/PlayerHand";

interface ICombatProps {}

export const Combat = (props: ICombatProps) => {
  return (
    <>
      <Battlefield></Battlefield>
      <PlayerHand></PlayerHand>;
    </>
  );
};
