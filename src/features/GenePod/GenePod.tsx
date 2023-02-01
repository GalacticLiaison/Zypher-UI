import Button from "@mui/material/Button";
import { useState } from "react";
import { Player } from "../../services/character-service/character-factory";
import { Gene } from "../../services/gene-service";
import { Mutation } from "../../services/mutation-service";
import { Xenogen } from "../../services/xenogen-service";
import { DiscoveredGenes } from "./DiscoveredGenes/DiscoveredGenes";
import { StableMutations } from "./StableMutations/StableMutations";

interface IGenePodProps {
  player: Player;
  discoveredGenes: Gene[];
  updateDiscoveredGenes: (genes: Gene[]) => void;
  stableMutations: Mutation[];
  updateStableMutations: (mutations: Mutation[]) => void;
  xenogenLevels: Xenogen;
  updateXenogenLevel: (xenogen: Xenogen) => void;
}

//* Story:
//*    Player accidentally applies an unstable mutation to themself.
//*    Pod grabs player and launches tutorial.
//*    Pod injects needle in player and takes a Gene sample.
//*    Player is told mutation will kill them, but the pod can save them.
//*    Player is told they must apply the newly discovered human gene to save themself.
//*    Player applies gene, they are healed and discover the human arm mutation.
export const GenePod = (props: IGenePodProps) => {
  //* Story: Player enters the pod

  //* Story: Player may apply a discovered gene
  //* OR
  //* Story: Player may apply a discovered mutation

  //* Story: Gene Pod displays list of discovered genes
  //* Story: Player Discovers First Gene by using GenePod, its "human" gene
  //* Story: Selecting a gene displays list of discovered Strains for that gene
  //* Story: Selecting a strain displays list of discovered mutations for that strain
  //*      - there should be some kind of percentage discovered for each mutation

  //* Story: Strains can be discovered from discovered genes or from applying specific mutations
  //* Story: Some mutations are a fusion of two or more mutations
  //*      - these fusions will be discovered by R&D, not by the player

  const [openDiscoveredGenesModal, setDiscoveredGenesModal] = useState(false);
  const handleDiscoveredGenesOpen = () => setDiscoveredGenesModal(true);
  const handleDiscoveredGenesClose = () => setDiscoveredGenesModal(false);

  const [openStableMutsModal, setStableMutsModal] = useState(false);
  const handleStableMutsOpen = () => setStableMutsModal(true);
  const handleStableMutsClose = () => setStableMutsModal(false);

  return (
    <div>
      I am a GenePod component
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
        ></StableMutations>
      </div>
    </div>
  );
};
