"use client";

import { AppBar, Avatar, Toolbar, IconButton, Button } from "@mui/material";
import { signIn, signOut } from "next-auth/react";
import type { Session } from "next-auth";

import type { FC } from "react";

const NavBar: FC<{ preloaded: Session | null }> = ({ preloaded }) => {
  return (
    <AppBar position="sticky">
      <Toolbar sx={{ justifyContent: "flex-end" }}>
        {preloaded && (
          <IconButton onClick={() => signOut()}>
            <Avatar />
          </IconButton>
        )}
        {!preloaded && (
          <Button onClick={() => signIn()} variant="outlined">
            Log in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
