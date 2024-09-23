import Link from "next/link";

import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="grid grow place-items-center">
      <div className="flex flex-col gap-4">
        <p className="text-center">This page does not exist.</p>

        <Button size={"sm"} asChild>
          <Link href="/" className="uppercase">
            Go Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
