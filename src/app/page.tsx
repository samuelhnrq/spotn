import { api } from "@/trpc/server";
import { auth } from "@/server/auth";
import { Stack, Typography, CircularProgress } from "@mui/material";
import { Suspense } from "react";
import ArtistSelector from "./ArtistSelector";
import Guesses from "./GuessesList";
import NavBar from "./NavBar";

export default async function Home() {
  const session = await auth();
  if (session) {
    await api.artists.listGuesses.prefetch();
  }
  return (
    <Stack
      sx={{
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <NavBar preloaded={session} />
      <Stack
        sx={{
          flex: 1,
          width: "100%",
          maxWidth: "550px",
          margin: "10vh auto",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h1" align="center" sx={{ marginBottom: "1rem" }}>
          Spotn
        </Typography>
        {session && (
          <>
            <ArtistSelector />
            <Suspense fallback={<CircularProgress />}>
              <Guesses />
            </Suspense>
          </>
        )}
      </Stack>
    </Stack>
  );
}
