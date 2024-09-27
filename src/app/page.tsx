import { auth } from "@/server/auth";
import { Stack, Typography } from "@mui/material";
import ArtistSelector from "./ArtistSelector";
import GuessesList from "./GuessesList";
import NavBar from "./NavBar";
import { HydrateClient, api } from "@/trpc/server";

export default async function Home() {
  const session = await auth();
  void api.artists.listGuesses.prefetch();
  return (
    <HydrateClient>
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
              <GuessesList />
            </>
          )}
        </Stack>
      </Stack>
    </HydrateClient>
  );
}
