import { SignInButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { AppBar, Button, Toolbar } from "@mui/material";
import type { FC } from "react";

const NavBar: FC = () => {
  const session = auth();

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ justifyContent: "flex-end" }}>
        {session.userId ? (
          <UserButton />
        ) : (
          <SignInButton>
            <Button>Log in</Button>
          </SignInButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
