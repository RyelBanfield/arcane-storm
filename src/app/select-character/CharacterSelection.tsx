import { UserResource } from "@clerk/types";
import { CircleBackslashIcon } from "@radix-ui/react-icons";
import { useMutation, useQuery } from "convex/react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";

import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

const CharacterSelection = ({
  userFromClerk,
}: {
  userFromClerk: UserResource;
}) => {
  const router = useRouter();
  const characters = useQuery(api.characters.getAvailableCharacters);
  const selectCharacter = useMutation(api.users.selectCharacter);
  const userFromConvex = useQuery(api.users.getUser, {
    clerkId: userFromClerk.id,
  });

  if (userFromConvex === undefined || characters === undefined) {
    return (
      <div className="grid grow place-items-center">
        <CircleBackslashIcon className="size-8 animate-spin" />
      </div>
    );
  }

  if (userFromConvex === null) redirect("/update-username");

  const onSelectCharacter = async (characterId: Id<"characters">) => {
    await selectCharacter({
      clerkId: userFromClerk.id,
      characterId: characterId,
    });

    router.replace("/game");
  };

  return (
    <>
      <h1 className="text-xl font-bold">Select Character</h1>

      <div className="grid grid-cols-1 gap-6 min-[440px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {characters.map((character, index) => (
          <div
            key={index}
            className="flex flex-col gap-3 rounded bg-neutral-900 hover:cursor-pointer"
            onClick={() => onSelectCharacter(character._id)}
          >
            <Image
              src={character.imageUrl}
              alt={`${index + 1} character`}
              width={400}
              height={400}
              className="rounded-t"
            />

            <div className="flex flex-col gap-3 px-3 py-6">
              <div>
                <p className="text-lg font-bold">{character.name}</p>
                <p className="text-xs text-neutral-500">{character.faction}</p>
              </div>

              <p className="text-sm leading-snug tracking-tight text-neutral-300">
                {character.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CharacterSelection;
