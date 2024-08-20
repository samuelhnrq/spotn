import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import type { GuessesState } from "../models";
import { api } from "./api";

const initialState: GuessesState = {
  date: Date.now(),
  loading: false,
  hasCorrectGuess: false,
  guesses: [],
};

export const guessesSlice = createSlice({
  name: "guesses",
  initialState,
  reducers: {
    resetDate(state) {
      state.date = Date.now();
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(api.endpoints.guessArtist.matchFulfilled),
      (state, action) => {
        state.guesses.push(action.payload);
        state.hasCorrectGuess = action.payload.correct;
      },
    );
  },
});

// Action creators are generated for each case reducer function
export const { resetDate } = guessesSlice.actions;

export default guessesSlice.reducer;
