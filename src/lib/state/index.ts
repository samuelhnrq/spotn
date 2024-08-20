import {
  configureStore,
  type Action,
  type ThunkAction,
} from "@reduxjs/toolkit";
import guesses from "./guesses";
import { api } from "./api";

export const makeStore = () => {
  return configureStore({
    reducer: {
      guesses,
      [api.reducerPath]: api.reducer,
    },
    middleware: (defaultM) => defaultM().concat(api.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
// Export a reusable type for handwritten thunks
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
