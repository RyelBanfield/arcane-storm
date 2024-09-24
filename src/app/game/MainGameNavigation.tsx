import { UserResource } from "@clerk/types";
import { CircleBackslashIcon } from "@radix-ui/react-icons";
import { useQuery } from "convex/react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { api } from "../../../convex/_generated/api";
import { Button } from "../../components/ui/button";

const MainGameNavigation = ({
  userFromClerk,
}: {
  userFromClerk: UserResource;
}) => {
  const userFromConvex = useQuery(api.users.getUser, {
    clerkId: userFromClerk.id,
  });

  if (userFromConvex === undefined) {
    return (
      <div className="grid grow place-items-center">
        <CircleBackslashIcon className="size-8 animate-spin" />
      </div>
    );
  }

  if (userFromConvex === null) redirect("/update-username");
  console.log(userFromConvex.currentCharacterId);
  if (!userFromConvex.currentCharacterId) redirect("/select-character");

  return (
    <div className="flex flex-col gap-6">
      <Button size={"sm"} asChild>
        <Link href="/world" className="uppercase">
          Enter World
        </Link>
      </Button>

      <Button size={"sm"} asChild>
        <Link href="/view-character" className="uppercase">
          View Character
        </Link>
      </Button>

      <Button size={"sm"} asChild>
        <Link href="/select-character" className="uppercase">
          Select Character
        </Link>
      </Button>

      <Button size={"sm"} asChild>
        <Link href="/marketplace" className="uppercase">
          View Marketplace
        </Link>
      </Button>
    </div>
  );
};

export default MainGameNavigation;
