import { Route, Routes } from "react-router-dom";
import { GameMaster } from "./features/GameMaster/GameMaster";
import { STORY } from "./STORY";
import { DeckBuilder } from "./features/Deck Builder/DeckBuilder";
import { Battlefield } from "./features/Combat/Battlefield/Battlefield";
import { Combat } from "./features/Combat/Combat";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<STORY />}></Route>
      <Route path="/gamemaster" element={<GameMaster />}></Route>
      <Route path="/combat" element={<Combat />}></Route>
      <Route path="/deck-builder" element={<DeckBuilder />}></Route>
      {/* <Route path="/combat" element={<Combat />}></Route> */}
    </Routes>
  );
}
