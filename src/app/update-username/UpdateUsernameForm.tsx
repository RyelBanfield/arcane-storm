import { UserResource } from "@clerk/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleBackslashIcon } from "@radix-ui/react-icons";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { api } from "../../../convex/_generated/api";

const formSchema = z.object({
  username: z
    .string()
    .min(4, {
      message: "Username must be at least 4 characters.",
    })
    .max(20, {
      message: "Username must be at most 20 characters.",
    }),
});

const UpdateUsernameForm = ({
  userFromClerk,
}: {
  userFromClerk: UserResource;
}) => {
  const router = useRouter();
  const insertOrPatchUsername = useMutation(api.users.insertOrPatchUsername);
  const userFromConvex = useQuery(api.users.getUser, {
    clerkId: userFromClerk.id,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  if (userFromConvex === undefined) {
    return (
      <div className="grid grow place-items-center">
        <CircleBackslashIcon className="size-8 animate-spin" />
      </div>
    );
  }

  console.log(userFromConvex?.username);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await insertOrPatchUsername({
      clerkId: userFromClerk.id,
      username: values.username,
    });

    router.replace("/");
  };

  return (
    <Form {...form}>
      <div className="grid grow place-items-center">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-6 p-6"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>

                <FormControl>
                  <Input
                    placeholder={userFromConvex?.username ?? "arcane_dev"}
                    autoComplete="off"
                    disabled={userFromConvex?.username ? true : false}
                    {...field}
                  />
                </FormControl>

                <FormDescription>This is public and permanent.</FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            size={"sm"}
            disabled={userFromConvex?.username ? true : false}
          >
            Update Username
          </Button>
        </form>
      </div>
    </Form>
  );
};

export default UpdateUsernameForm;
