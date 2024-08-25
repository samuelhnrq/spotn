import {
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { AppBar, Skeleton, Stack, Toolbar, Typography } from "@mui/material";
import ArtistSelector from "./ArtistSelector";
import GuessesList from "./GuessesList";

export default function Home() {
  return (
    <Stack
      sx={{
        height: "100vh",
        width: "100%",
      }}
    >
      <AppBar position="sticky">
        <Toolbar sx={{ justifyContent: "flex-end" }}>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <ClerkLoading>
            <Skeleton variant="circular" width={30} height={30} />
          </ClerkLoading>
        </Toolbar>
      </AppBar>
      <Stack
        sx={{
          flex: 1,
          width: "100%",
          maxWidth: "550px",
          margin: "0 auto",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h1" align="center" sx={{ marginBottom: "1rem" }}>
          Spotn
        </Typography>
        <ArtistSelector />
        <GuessesList />
      </Stack>
    </Stack>
  );
}
