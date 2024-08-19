import { createSlice } from "@reduxjs/toolkit";
import type { GuessesState } from "../models";
import { api } from "./api";

const initialState: GuessesState = {
  date: new Date(),
  loading: false,
  hasCorrectGuess: false,
  guesses: [],
};

export const guessesSlice = createSlice({
  name: "guesses",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(api.endpoints.searchArtist.matchFulfilled, (state) => {
      console.log("OMGGG");
      state.date = new Date();
    });
  },
});

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default guessesSlice.reducer;
