"use client";

import { useGuesses } from "@/lib/hooks";
import { Typography } from "@mui/material";
import GuessedArtistCard from "./GuessedArtistCard";

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
