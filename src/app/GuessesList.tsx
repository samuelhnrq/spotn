"use client";

import { queryTrpc } from "@/lib/trpc";
// import { useAuth } from "@clerk/nextjs";
import { Typography } from "@mui/material";
import GuessedArtistCard from "./GuessedArtistCard";
import { Suspense, type FC } from "react";

const GuessList: FC = () => {
  const [data, { isFetching }] =
    queryTrpc.artists.listGuesses.useSuspenseQuery();
  return (
    <>
      {"fetching: " + isFetching}
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
