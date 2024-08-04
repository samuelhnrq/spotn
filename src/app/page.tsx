import { Stack, Typography } from "@mui/material";
import ArtistSelector from "./ArtistSelector";
import GuessesList from "./GuessesList";

export default function Home() {
  return (
    <Stack
      sx={{
        height: "100vh",
        display: "flex",
        flex: "1 1 0",
        flexDirection: "column",
        width: "100%",
        margin: "0 auto",
        maxWidth: "550px",
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
  );
}
