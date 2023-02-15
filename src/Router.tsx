import { Route, Routes } from "react-router-dom";
import { Combat } from "./features/Combat/Combat";
import { GameMaster } from "./features/GameMaster/GameMaster";
import { STORY } from "./STORY";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<STORY />}></Route>
      <Route path="/gamemaster" element={<GameMaster />}></Route>
      <Route path="/combat" element={<Combat />}></Route>
    </Routes>
  );
}
