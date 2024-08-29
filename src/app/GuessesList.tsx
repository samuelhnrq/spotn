"use client";

import { trpc } from "@/lib/trpc";
import { useAuth } from "@clerk/nextjs";
import { LinearProgress, Typography } from "@mui/material";
import GuessedArtistCard from "./GuessedArtistCard";

function GuessesList() {
  const auth = useAuth();
  console.log("auth state is", auth.isLoaded, auth.isSignedIn);
  const { data = [], isLoading } = trpc.artists.listGuesses.useQuery(
    undefined,
    {
      enabled: auth.isSignedIn,
    },
  );

  return (
    <>
      <Typography variant="h3" marginTop={4}>
        Guesses
      </Typography>
      {isLoading && <LinearProgress />}
      {data.map((guess) => (
        <GuessedArtistCard guess={guess} key={guess.artist.id} />
      ))}
    </>
  );
}

export default GuessesList;
