import { createSlice } from "@reduxjs/toolkit";
import type { ArtistSearchResult, GuessesState } from "../models";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { trpcClient } from "@/lib/trpc";

const initialState: GuessesState = {
  date: new Date(),
  loading: false,
  hasCorrectGuess: false,
  guesses: [],
};

export const guessArtist = createAsyncThunk(
  "guesses/guess",
  async (artist: ArtistSearchResult) => {
    console.log("will ask the api");
    const item = await trpcClient.artists.guessArtist.query(artist.mbid);
    console.log("api said ", item);
    return item;
  },
);

export const guessesSlice = createSlice({
  name: "guesses",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(guessArtist.fulfilled, (state, action) => {
        state.guesses.push(action.payload);
        state.loading = false;
      })
      .addCase(guessArtist.pending, (state) => {
        state.loading = true;
      })
      .addCase(guessArtist.rejected, (state) => {
        state.loading = false;
      });
  },
});

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default guessesSlice.reducer;
