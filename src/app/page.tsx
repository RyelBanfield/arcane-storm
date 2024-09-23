"use client";

import { SignInButton, useUser } from "@clerk/nextjs";
import { CircleBackslashIcon } from "@radix-ui/react-icons";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";

const LandingPage = () => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return (
      <div className="grid grow place-items-center">
        <CircleBackslashIcon className="size-8 animate-spin" />
      </div>
    );
  }

  if (isSignedIn) redirect("/game");

  return (
    <div className="grid grow place-items-center">
      <SignInButton mode="modal">
        <Button size={"sm"} className="uppercase">
          Sign up or Log in
        </Button>
      </SignInButton>
    </div>
  );
};

export default LandingPage;
