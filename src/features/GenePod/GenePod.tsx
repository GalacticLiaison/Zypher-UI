import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { Perk } from "../../services/character-service/Character";
import { Player } from "../../services/character-service/character-factory";
import { Gene } from "../../services/gene-service";
import { Mutation } from "../../services/mutation-service";
import { Xenogen } from "../../services/xenogen-service";
import { PlayerSheet } from "../Player/PlayerSheet";
import { DiscoveredGenes } from "./components/DiscoveredGenes/DiscoveredGenes";
import { StableMutations } from "./components/StableMutations/StableMutations";

interface IGenePodProps {
  player: Player;
  discoveredGenes: Gene[];
  updateDiscoveredGenes: (genes: Gene[]) => void;
  stableMutations: Mutation[];
  updateStableMutations: (mutations: Mutation[]) => void;
  xenogenLevels: Xenogen;
  updateXenogenLevel: (xenogen: Xenogen) => void;
}

export const GenePod = (props: IGenePodProps) => {
  const [player, setPlayer] = useState<Player>(props.player);
  useEffect(() => {
    setPlayer(props.player);
  }, [props.player]);

  const [openDiscoveredGenesModal, setDiscoveredGenesModal] = useState(false);
  const handleDiscoveredGenesOpen = () => setDiscoveredGenesModal(true);
  const handleDiscoveredGenesClose = () => setDiscoveredGenesModal(false);

  const [openStableMutsModal, setStableMutsModal] = useState(false);
  const handleStableMutsOpen = () => setStableMutsModal(true);
  const handleStableMutsClose = () => setStableMutsModal(false);

  const applyMutation = (mutation: Mutation) => {
    // console.log("Applying mutation: ", mutation);
    let statChanges = mutation.appliedStatBonuses;
    const perks = mutation.appliedPerks;

    perks.forEach((perk: Perk) => {
      console.log("Perk: ", perk);
      console.log("Perk Bonus: ", perk.appliedStatBonuses);
      if (perk.appliedStatBonuses)
        statChanges = [...statChanges, ...perk.appliedStatBonuses];
    });

    setPlayer({
      ...player,
      statChanges: [...player.statChanges, ...statChanges],
      perks: [...player.perks, ...perks],
    });
  };

  return (
    <div>
      <PlayerSheet player={player}></PlayerSheet>
      <div>
        <Button
          variant="outlined"
          size="large"
          onClick={handleDiscoveredGenesOpen}
        >
          Discovered Genes
        </Button>
        <DiscoveredGenes
          open={openDiscoveredGenesModal}
          handleClose={handleDiscoveredGenesClose}
          genes={props.discoveredGenes}
          // applyMutation={applyMutation}
        ></DiscoveredGenes>
      </div>
      <div>
        <Button variant="outlined" size="large" onClick={handleStableMutsOpen}>
          Stable Mutations
        </Button>
        <StableMutations
          open={openStableMutsModal}
          handleClose={handleStableMutsClose}
          mutations={props.stableMutations}
          applyMutation={applyMutation}
        ></StableMutations>
      </div>
    </div>
  );
};
