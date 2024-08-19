import {
  configureStore,
  type Action,
  type Middleware,
  type ThunkAction,
} from "@reduxjs/toolkit";
import type { SpotnState } from "../models";
import Cookies from "js-cookie";
import { guessesSlice } from "./guesses";
import SuperJSON from "superjson";
import { api } from "./api";

export const PERSISTENCE_KEY = "spotn_state";

export const makeEmptyState = (): SpotnState => ({
  guesses: {
    date: new Date(),
    guesses: [],
    hasCorrectGuess: false,
    loading: false,
  },
});

export const makeStore = (preloadedState?: SpotnState) => {
  return configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      guesses: guessesSlice.reducer,
    },
    middleware: (defaultM) =>
      defaultM().concat(persister).concat(api.middleware),
    preloadedState,
  });
};

const persister: Middleware<void, SpotnState> =
  (store) => (next) => (action) => {
    const result = next(action);
    Cookies.set(PERSISTENCE_KEY, SuperJSON.stringify(store.getState()), {
      sameSite: "Lax",
      path: "/",
    });
    return result;
  };

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
// Export a reusable type for handwritten thunks
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
