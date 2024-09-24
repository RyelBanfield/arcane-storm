"use client";

import { useUser } from "@clerk/nextjs";
import { CircleBackslashIcon } from "@radix-ui/react-icons";
import { redirect } from "next/navigation";

import CharacterDetails from "./CharacterDetails";

const CharacterPage = () => {
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
    <div className="grid grow">
      <CharacterDetails userFromClerk={user} />
    </div>
  );
};

export default CharacterPage;
