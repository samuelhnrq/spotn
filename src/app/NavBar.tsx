import {
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { AppBar, Button, Skeleton, Toolbar } from "@mui/material";
import type { FC } from "react";

const NavBar: FC = () => {
  return (
    <AppBar position="sticky">
      <Toolbar sx={{ justifyContent: "flex-end" }}>
        <SignedOut>
          <SignInButton>
            <Button>Log in</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <ClerkLoading>
          <Skeleton variant="circular" width={35} height={35} />
        </ClerkLoading>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
