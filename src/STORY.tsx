import Button from "@mui/material/Button";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import { GenePod } from "./features/GenePod/GenePod";
import {
  createNewPlayer,
  Player,
} from "./services/character-service/character-factory";
import { Gene } from "./services/gene-service";
import { Mutation } from "./services/mutation-service";
import { Xenogen } from "./services/xenogen-service";

export const STORY = () => {
  const [player, setPlayer] = useState<Player>(
    createNewPlayer({
      name: "Dude",
      gender: "Male",
      hairColor: "Brown",
      hairStyle: "Short",
      eyeColor: "Blue",
      skinColor: "White",
    })
  );

  const [xenogenLevels, setXenogenLevel] = useState<Xenogen>({
    common: 0,
    rare: 0,
    epic: 0,
    legendary: 0,
  });
  const updateXenogenLevel = (xenogen: Xenogen) => {
    setXenogenLevel(xenogen);
  };

  const [discoveredGenes, setDiscoveredGenes] = useState<Gene[]>([]);
  const updateDiscoveredGenes = (genes: Gene[]) => {
    setDiscoveredGenes([...discoveredGenes, ...genes]);
  };

  const [stableMutations, setStableMutations] = useState<Mutation[]>([]);
  const updateStableMutations = (mutations: Mutation[]) => {
    setStableMutations([...stableMutations, ...mutations]);
  };

  return (
    <div>
      <Link to="/gamemaster">
        <Button variant="outlined" size="large">
          Game Master
        </Button>
      </Link>
      <GenePod
        player={player}
        discoveredGenes={discoveredGenes}
        updateDiscoveredGenes={updateDiscoveredGenes}
        stableMutations={stableMutations}
        updateStableMutations={updateStableMutations}
        xenogenLevels={xenogenLevels}
        updateXenogenLevel={updateXenogenLevel}
      ></GenePod>
    </div>
  );
};
