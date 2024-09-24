import { UserResource } from "@clerk/types";
import { CircleBackslashIcon } from "@radix-ui/react-icons";
import { useQuery } from "convex/react";
import Image from "next/image";

import { api } from "../../../convex/_generated/api";

const CharacterDetails = ({
  userFromClerk,
}: {
  userFromClerk: UserResource;
}) => {
  const userFromConvex = useQuery(api.users.getUser, {
    clerkId: userFromClerk.id,
  });
  const character = useQuery(api.characters.getCharacter, {
    clerkId: userFromClerk.id,
  });

  if (!userFromConvex || !character) {
    return (
      <div className="grid grow place-items-center">
        <CircleBackslashIcon className="size-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 px-6 py-12 sm:flex-row">
      <div className="sm:hidden">
        <h1 className="text-xl font-bold">{character.name}</h1>
        <p className="text-xs text-neutral-500">{character.faction}</p>
      </div>

      <div className="w-full">
        <Image
          src={character.imageUrl}
          alt={character.name}
          width={1080}
          height={1080}
          className="rounded"
        />
      </div>

      <div className="flex w-full flex-col gap-3 pb-32">
        <div className="hidden sm:block">
          <h1 className="text-xl font-bold">{character.name}</h1>
          <p className="text-xs text-neutral-500">{character.faction}</p>
        </div>

        <p className="text-xs leading-snug tracking-tight text-neutral-300">
          {character.description}
        </p>
      </div>
    </div>
  );
};

export default CharacterDetails;
