"use client";

import { useAppSelector } from "@/lib/hooks";
import { LinearProgress, Typography } from "@mui/material";
import GuessedArtistCard from "./GuessedArtistCard";

function GuessesList() {
  const state = useAppSelector((x) => x.guesses);

  return (
    <>
      <Typography variant="h3" marginTop={4}>
        Guesses
      </Typography>
      {state.loading && <LinearProgress />}
      {state.guesses.map((guess) => (
        <GuessedArtistCard guess={guess} key={guess.artist.id} />
      ))}
    </>
  );
}

export default GuessesList;
