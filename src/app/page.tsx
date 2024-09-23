"use client";

import { SignInButton, useUser } from "@clerk/nextjs";
import { CircleBackslashIcon } from "@radix-ui/react-icons";

import ClientHomePage from "@/components/ClientHomePage";
import { Button } from "@/components/ui/button";

const LandingPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return (
      <div className="grid grow place-items-center">
        <CircleBackslashIcon className="size-8 animate-spin" />
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="grid grow place-items-center">
        <SignInButton mode="modal">
          <Button size={"sm"} className="uppercase">
            Sign in
          </Button>
        </SignInButton>
      </div>
    );
  }

  return (
    <div className="flex grow flex-col">
      <ClientHomePage userFromClerk={user} />
    </div>
  );
};

export default LandingPage;
