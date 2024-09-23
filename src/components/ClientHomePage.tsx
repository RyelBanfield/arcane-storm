import { UserResource } from "@clerk/types";
import { CircleBackslashIcon } from "@radix-ui/react-icons";
import { useQuery } from "convex/react";
import { redirect } from "next/navigation";

import { api } from "../../convex/_generated/api";

const ClientHomePage = ({ userFromClerk }: { userFromClerk: UserResource }) => {
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

  return (
    <div className="grid grow place-items-center">
      <div>
        <p className="text-center">
          Hello, {userFromClerk.firstName} from Clerk!
        </p>
        <p className="text-center">
          Your username from Convex is {userFromConvex.username}
        </p>
      </div>
    </div>
  );
};

export default ClientHomePage;
