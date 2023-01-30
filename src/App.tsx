import { useState } from "react";
import "./App.css";
import { GenePod } from "./features/GenePod/GenePod";
import {
  createNewPlayer,
  Player,
} from "./services/character-service/character-factory";
import { Xenogen } from "./services/xenogen-service";

function App() {
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
    standard: 0,
    rare: 0,
    epic: 0,
    legendary: 0,
  });

  return (
    <div>
      <GenePod></GenePod>
    </div>
  );
}

export default App;
