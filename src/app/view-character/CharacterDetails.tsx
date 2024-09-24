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

  if (userFromConvex === undefined || character === undefined) {
    return (
      <div className="grid grow place-items-center">
        <CircleBackslashIcon className="size-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 px-6 py-12">
      <h1 className="text-xl font-bold">{character!.name}</h1>

      <Image
        src={character!.imageUrl}
        alt={character!.name}
        width={1080}
        height={1080}
        className="rounded"
      />

      <p>{character?.faction}</p>
      <p>{character?.description}</p>
    </div>
  );
};

export default CharacterDetails;
