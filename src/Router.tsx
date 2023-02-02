import { Route, Routes } from "react-router-dom";
import { GameMaster } from "./features/GameMaster/GameMaster";
import { GenePod } from "./features/GenePod/GenePod";
import { STORY } from "./STORY";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<STORY />}></Route>
      <Route path="/gamemaster" element={<GameMaster />}></Route>
    </Routes>
  );
}
