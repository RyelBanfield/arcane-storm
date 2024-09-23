"use client";

import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleBackslashIcon } from "@radix-ui/react-icons";
import { useMutation } from "convex/react";
import { redirect, useRouter } from "next/navigation";
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
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(20, {
      message: "Username must be at most 20 characters.",
    }),
});

const UpdateUsernamePage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const insertOrPatchUsername = useMutation(api.users.insertOrPatchUsername);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  if (!isLoaded) {
    return (
      <div className="grid grow place-items-center">
        <CircleBackslashIcon className="size-8 animate-spin" />
      </div>
    );
  }

  if (!isSignedIn) redirect("/");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await insertOrPatchUsername({
      clerkId: user.id,
      username: values.username,
    });

    router.replace("/");
  };

  return (
    <Form {...form}>
      <div className="grid grow place-items-center">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-8"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="astral_staff" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" size={"sm"} className="uppercase">
            Update Username
          </Button>
        </form>
      </div>
    </Form>
  );
};

export default UpdateUsernamePage;
