"use client";

import { useUser } from "@clerk/nextjs";
import { CircleBackslashIcon } from "@radix-ui/react-icons";
import { redirect } from "next/navigation";

import ClientMenu from "./ClientMenu";

const GamePage = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return (
      <div className="grid grow place-items-center">
        <CircleBackslashIcon className="size-8 animate-spin" />
      </div>
    );
  }

  if (!isSignedIn) redirect("/");

  return (
    <div className="flex flex-col items-center justify-center">
      <ClientMenu userFromClerk={user} />
    </div>
  );
};

export default GamePage;
