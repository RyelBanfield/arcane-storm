import { UserResource } from "@clerk/types";
import { CircleBackslashIcon } from "@radix-ui/react-icons";
import { useMutation, useQuery } from "convex/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

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

  if (characters === undefined) {
    return (
      <div className="grid grow place-items-center">
        <CircleBackslashIcon className="size-8 animate-spin" />
      </div>
    );
  }

  const onSelectCharacter = async (characterId: Id<"characters">) => {
    await selectCharacter({
      clerkId: userFromClerk.id,
      characterId: characterId,
    });

    router.replace("/game");
  };

  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {characters.map((character, index) => (
        <div
          key={index}
          className="aspect-square rounded bg-neutral-900"
          onClick={() => onSelectCharacter(character._id)}
        >
          <Image
            src={character.imageUrl}
            alt={`${index + 1} character`}
            width={400}
            height={400}
            className="rounded"
          />
        </div>
      ))}
    </div>
  );
};

export default CharacterSelection;
