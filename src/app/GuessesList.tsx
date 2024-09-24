"use client";

import { Typography } from "@mui/material";
import GuessedArtistCard from "./GuessedArtistCard";
import { useGuesses } from "@/lib/hooks";

function Guesses() {
  const [data = []] = useGuesses();
  return (
    <>
      <Typography variant="h3" marginTop={4}>
        Guesses
      </Typography>
      {data.map((guess) => (
        <GuessedArtistCard guess={guess} key={guess.artist.id} />
      ))}
    </>
  );
}

export default Guesses;
