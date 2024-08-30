import { Stack, Typography } from "@mui/material";
import ArtistSelector from "./ArtistSelector";
import Guesses from "./GuessesList";
import NavBar from "./NavBar";
import { rscTrpc } from "@/lib/trpc-server-client";
import { auth } from "@clerk/nextjs/server";
import { SignedIn } from "@clerk/nextjs";

export default async function Home() {
  const authState = auth();
  if (authState.userId) {
    await rscTrpc.artists.listGuesses.prefetch();
  }

  return (
    <Stack
      sx={{
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <NavBar />
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
        <SignedIn>
          <ArtistSelector />
          <Guesses />
        </SignedIn>
      </Stack>
    </Stack>
  );
}
