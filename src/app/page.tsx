import { Stack, Typography } from "@mui/material";
import ArtistSelector from "./ArtistSelector";
import GuessesList from "./GuessesList";
import NavBar from "./NavBar";

export default function Home() {
  return (
    <Stack
      sx={{
        height: "100vh",
        width: "100%",
      }}
    >
      <NavBar />
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
