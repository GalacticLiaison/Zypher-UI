import { configureStore } from "@reduxjs/toolkit";
import "./features/Combat/combatSlice";
import combatReducer from "./features/Combat/combatSlice";

export const store = configureStore({
  reducer: {
    combat: combatReducer,
  },
});
