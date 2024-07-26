import { Toolbar, AppBar, IconButton, Typography, Button } from "@mui/material";
import { MusicNoteRounded } from "@mui/icons-material";
import React from "react";

function SpotnBar() {
  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MusicNoteRounded />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          News
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
}

export default SpotnBar;
