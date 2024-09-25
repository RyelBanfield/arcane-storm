import { UserResource } from "@clerk/types";
import { CircleBackslashIcon } from "@radix-ui/react-icons";
import { useMutation, useQuery } from "convex/react";
import Image from "next/image";
import { useState } from "react";

import { api } from "../../../convex/_generated/api";
import { Doc } from "../../../convex/_generated/dataModel";
import Modal from "./Modal";

export type Location = {
  name: string;
  faction: "Arcane" | "Storm";
  description: string;
  imageUrl: string;
};

const locations: Location[] = [
  {
    name: "Storm City",
    faction: "Storm",
    description:
      "Storm City hovers above the world, powered by the untamed energy of storms. Its technological wonders and sky-bound towers represent the peak of Storm faction ingenuity, but beneath its shimmering surface, rival factions seek to harness the city’s limitless power.",
    imageUrl: "/locations/Storm-City.jpg",
  },
  {
    name: "Ancient Temple",
    faction: "Arcane",
    description:
      "The Ancient Temple stands as a mysterious relic of a forgotten age, its halls echoing with the whispers of long-lost arcane rituals. Only those attuned to the ancient magics can unlock the temple’s deepest secrets, guarded by forgotten powers that still linger within.",
    imageUrl: "/locations/Ancient-Temple.jpg",
  },
  {
    name: "Mystic Ruins",
    faction: "Arcane",
    description:
      "Once the heart of a mighty empire, the Mystic Ruins now lie in decay, veiled in ancient magic. Legends tell of powerful arcane relics hidden within, but the ruins are fraught with magical traps and the lingering spirits of those who sought them and failed.",
    imageUrl: "/locations/Mystic-Ruins.jpg",
  },
  {
    name: "Red Dawn City",
    faction: "Storm",
    description:
      "At the edge of the world where dawn never ends, Red Dawn City pulses with raw energy. Fueled by constant storms, it’s a hub of innovation and power. But in the shadow of its towering structures, the line between progress and destruction is dangerously thin.",
    imageUrl: "/locations/Red-Dawn-City.jpg",
  },
];

const WorldExploration = ({
  userFromClerk,
}: {
  userFromClerk: UserResource;
}) => {
  const addSilver = useMutation(api.users.addSilver);
  const [event, setEvent] = useState<null | string>(null);
  const user = useQuery(api.users.getUser, { clerkId: userFromClerk.id });
  const character = useQuery(api.characters.getCharacter, {
    clerkId: userFromClerk.id,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );

  if (!user || !character) {
    return (
      <div className="grid grow place-items-center">
        <CircleBackslashIcon className="size-8 animate-spin" />
      </div>
    );
  }

  const determineOutcomeType = (factionMatches: boolean) => {
    const randomNum = Math.random();

    if (factionMatches) {
      if (randomNum < 0.5) return "good";
      if (randomNum < 0.85) return "neutral";
      return "bad";
    } else {
      if (randomNum < 0.4) return "good";
      if (randomNum < 0.75) return "neutral";
      return "bad";
    }
  };

  const exploreLocation = (
    character: Doc<"characters">,
    location: Location,
  ) => {
    const factionMatches = character.faction === location.faction;
    const outcomeType = determineOutcomeType(factionMatches);

    if (character.faction === "Arcane") {
      handleArcaneEvent(location, outcomeType);
    }

    if (character.faction === "Storm") {
      handleStormEvent(location, outcomeType);
    }
  };

  const handleArcaneEvent = (
    location: Location,
    outcomeType: "good" | "neutral" | "bad",
  ) => {
    switch (outcomeType) {
      case "good": {
        if (location.faction === "Arcane") {
          setEvent(
            "You find an ancient arcane relic that enhances your magical abilities. You gain a few silver.",
          );
          addSilver({ clerkId: userFromClerk.id, silver: 100 });
        } else {
          setEvent(
            "Despite the tech-heavy environment, you manage to harness some of the energy. You gain a few silver.",
          );
          addSilver({ clerkId: userFromClerk.id, silver: 50 });
        }
        break;
      }

      case "neutral": {
        if (location.faction === "Arcane") {
          setEvent(
            "You feel the familiar hum of arcane magic, but nothing significant happens.",
          );
        } else {
          setEvent(
            "You feel out of place but manage to navigate through without issue.",
          );
        }
        break;
      }

      case "bad": {
        if (location.faction === "Arcane") {
          setEvent(
            "A lingering curse in the temple zaps your strength. You lose a few silver.",
          );
          addSilver({ clerkId: userFromClerk.id, silver: -20 });
        } else {
          setEvent(
            "The city’s energy backfires against your magic, causing pain. You lose a few silver.",
          );
          addSilver({ clerkId: userFromClerk.id, silver: -30 });
        }
        break;
      }
    }
  };

  const handleStormEvent = (
    location: Location,
    outcomeType: "good" | "neutral" | "bad",
  ) => {
    switch (outcomeType) {
      case "good":
        if (location.faction === "Storm") {
          setEvent(
            "You uncover a hidden cache of storm energy. You gain a few silver.",
          );
          addSilver({ clerkId: userFromClerk.id, silver: 100 });
        } else {
          setEvent(
            "Your technological prowess helps you tap into latent energy here. You gain a few silver.",
          );
          addSilver({ clerkId: userFromClerk.id, silver: 50 });
        }
        break;

      case "neutral":
        if (location.faction === "Storm") {
          setEvent(
            "You feel the storm energy pulse around you, but nothing major happens.",
          );
        } else {
          setEvent("You don't quite fit here, but nothing bad happens.");
        }
        break;

      case "bad":
        if (location.faction === "Storm") {
          setEvent(
            "An energy surge catches you off guard, causing damage. You lose a few silver.",
          );
          addSilver({ clerkId: userFromClerk.id, silver: -20 });
        } else {
          setEvent(
            "The conflicting energies cause a dangerous malfunction. You lose a few silver.",
          );
          addSilver({ clerkId: userFromClerk.id, silver: -30 });
        }
        break;
    }
  };

  const openModal = (location: Location) => {
    setSelectedLocation(location);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLocation(null);
  };

  const handleExplore = () => {
    if (selectedLocation) {
      exploreLocation(character, selectedLocation);
    }
  };

  return (
    <div className="flex flex-col gap-6 px-6 py-12 pb-32">
      <div className="flex flex-col justify-between min-[425px]:flex-row min-[425px]:items-center">
        <h1 className="text-xl font-bold">Explore The World</h1>

        <p className="text-sm tracking-wide">
          You have{" "}
          <span className="font-bold text-neutral-500">{user.silver}</span>{" "}
          silver.
        </p>
      </div>

      <div>
        <p className="font-medium tracking-wide">
          <span className="font-bold text-neutral-500">{character.name}</span>{" "}
          is from the{" "}
          <span className="font-bold text-neutral-500">
            {character.faction}
          </span>{" "}
          faction. So they will be have a better experience exploring{" "}
          <span className="font-bold text-neutral-500">
            {character.faction}
          </span>{" "}
          faction locations.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 min-[440px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {locations.map((location) => (
          <div
            key={location.name}
            className="flex flex-col rounded bg-neutral-900 hover:cursor-pointer"
            onClick={() => {
              setEvent(null);
              openModal(location);
            }}
          >
            <Image
              alt={location.name}
              src={location.imageUrl}
              width={400}
              height={400}
              className="rounded-t"
            />

            <div className="flex flex-col gap-3 px-3 py-6">
              <div>
                <p className="text-lg font-bold">{location.name}</p>
                <p className="text-xs text-neutral-500">{location.faction}</p>
              </div>

              <p className="text-sm leading-snug tracking-tight text-neutral-300">
                {location.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        character={character}
        location={selectedLocation}
        onExplore={handleExplore}
        event={event}
      />
    </div>
  );
};

export default WorldExploration;
