"use client";

import { useUser } from "@clerk/nextjs";
import { CircleBackslashIcon } from "@radix-ui/react-icons";
import { redirect } from "next/navigation";

import WorldExploration from "./WorldExploration";

const WorldPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return (
      <div className="grid grow place-items-center">
        <CircleBackslashIcon className="size-8 animate-spin" />
      </div>
    );
  }
  if (!isSignedIn) redirect("/");

  return <WorldExploration userFromClerk={user} />;
};

export default WorldPage;
