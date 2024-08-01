import { Box, Stack, Typography } from "@mui/material";
import ArtistSelector from "./ArtistSelector";
import GuessesList from "./GuessesList";
import SpotnBar from "./SpotnBar";

export default function Home() {
  return (
    <Stack height="100vh">
      <SpotnBar />
      <Box
        sx={{
          display: "flex",
          flex: "1 1 0",
          flexDirection: "column",
          width: "100%",
          margin: "0 auto",
          maxWidth: "550px",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Stack width="100%" justifyContent="center">
          <Typography variant="h1" align="center">
            Spotn
          </Typography>
          <ArtistSelector />
          <GuessesList />
        </Stack>
      </Box>
    </Stack>
  );
}
