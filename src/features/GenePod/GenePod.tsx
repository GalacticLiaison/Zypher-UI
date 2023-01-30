import { useState } from "react";
import { Gene } from "../../services/gene-service";
import { Mutation } from "../../services/mutation-service";

interface IGenePodProps {}

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
  const [discoveredGenes, setDiscoveredGenes] = useState<Gene[]>();

  //* Story: Strains can be discovered from discovered genes or from applying specific mutations
  //* Story: Some mutations are a fusion of two or more mutations
  //*      - these fusions will be discovered by R&D, not by the player
  const [stableMutations, setStableMutations] = useState<Mutation[]>();

  const applyStableMutation = () => {};

  return (
    <div>
      I am a GenePod component
      <div>
        I am a button to apply discovered genes
        <div>I am a list of discovered genes</div>
      </div>
      <div>
        I am a button to apply stable mutations
        <div>I am a categorized list of mapped mutations</div>
      </div>
    </div>
  );
};
