"use client";

import { Suspense, useEffect } from "react";
import { useGuesses } from "@/lib/hooks";
import { CircularProgress, LinearProgress, Typography } from "@mui/material";
import GuessedArtistCard from "./GuessedArtistCard";
import { useLoading } from "./state";

function GuessesList() {
  const [loading, setLoading] = useLoading();
  const { data = [], isPending, isStale } = useGuesses();
  useEffect(() => {
    if (loading && !isStale && !isPending) {
      setLoading(false);
    }
    if (isStale || isPending) {
      setLoading(true);
    }
  }, [loading, isPending, isStale, setLoading]);
  return (
    <>
      {data.map((guess) => (
        <GuessedArtistCard guess={guess} key={guess.artist.id} />
      ))}
    </>
  );
}

function Guesses() {
  const [loading] = useLoading();

  return (
    <>
      <Typography variant="h3" marginTop={4}>
        Guesses
      </Typography>
      {loading && (
        <LinearProgress
          variant="indeterminate"
          color="secondary"
          sx={{ width: "100%" }}
        />
      )}
      <Suspense fallback={<CircularProgress />}>
        <GuessesList />
      </Suspense>
    </>
  );
}

export default Guesses;
