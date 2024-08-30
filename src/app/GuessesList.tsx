"use client";

import { queryTrpc } from "@/lib/trpc";
// import { useAuth } from "@clerk/nextjs";
import { Typography } from "@mui/material";
import { type FC, Suspense } from "react";
import GuessedArtistCard from "./GuessedArtistCard";

const GuessList: FC = () => {
  const [data] = queryTrpc.artists.listGuesses.useSuspenseQuery();
  return (
    <>
      {data.map((guess) => (
        <GuessedArtistCard guess={guess} key={guess.artist.id} />
      ))}
    </>
  );
};

function Guesses() {
  return (
    <>
      <Typography variant="h3" marginTop={4}>
        Guesses
      </Typography>
      <Suspense fallback={"Loading?"}>
        <GuessList />
      </Suspense>
    </>
  );
}

export default Guesses;
