"use client";

import { useUser } from "@clerk/nextjs";
import { CircleBackslashIcon } from "@radix-ui/react-icons";
import { redirect } from "next/navigation";

import CharacterSelection from "./CharacterSelection";

const SelectCharacterPage = () => {
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
    <div className="flex flex-col gap-6 px-6 py-12">
      <h1 className="text-xl font-bold">Select Character</h1>

      <CharacterSelection userFromClerk={user} />
    </div>
  );
};

export default SelectCharacterPage;
