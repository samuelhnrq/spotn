import { Box, Button, Typography } from "@mui/material";

export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        margin: "0 auto",
        maxWidth: "750px",
        minHeight: "100vh",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <Typography variant="h1">Spotn</Typography>
      <Button variant="outlined">Hello world</Button>
    </Box>
  );
}
