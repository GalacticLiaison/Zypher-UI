import { Route, Routes } from "react-router-dom";
import { Combat } from "./features/Combat/Combat";
import { CombatEvolved } from "./features/Combat/CombatEvolved";
import { GameMaster } from "./features/GameMaster/GameMaster";
import { STORY } from "./STORY";
import { Hand } from "./features/Combat/dragNdropLearning/Hand";
// import { Hand } from "./features/Combat/dragNdropLearning/Hand_proto";
import { Battlefield_proto } from "./features/Combat/dragNdropLearning/Battlefield_proto";
import { DeckBuilder } from "./features/Deck Builder/DeckBuilder";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<STORY />}></Route>
      <Route path="/gamemaster" element={<GameMaster />}></Route>
      <Route path="/combat" element={<Battlefield_proto />}></Route>
      <Route path="/deck-builder" element={<DeckBuilder />}></Route>
      {/* <Route path="/combat" element={<Combat />}></Route> */}
    </Routes>
  );
}
