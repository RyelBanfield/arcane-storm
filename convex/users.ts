import { v } from "convex/values";

import { mutation, query } from "./_generated/server";

export const getUser = query({
  args: { clerkId: v.string() },

  handler: async (ctx, { clerkId }) => {
    return await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), clerkId))
      .unique();
  },
});

export const insertOrPatchUsername = mutation({
  args: {
    clerkId: v.string(),
    username: v.string(),
  },

  handler: async (ctx, { clerkId, username }) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), clerkId))
      .unique();

    if (user === null) {
      await ctx.db.insert("users", {
        clerkId,
        username,
      });
    } else {
      await ctx.db.patch(user._id, {
        clerkId,
        username,
      });
    }
  },
});

export const selectCharacter = mutation({
  args: {
    clerkId: v.string(),
    characterId: v.string(),
  },

  handler: async (ctx, { clerkId, characterId }) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), clerkId))
      .unique();

    if (!user) throw new Error("User not found.");

    const oldCharacter = await ctx.db
      .query("characters")
      .filter((q) => q.eq(q.field("_id"), user.currentCharacterId))
      .unique();

    const newCharacter = await ctx.db
      .query("characters")
      .filter((q) => q.eq(q.field("_id"), characterId))
      .unique();

    if (!newCharacter) throw new Error("New character not found.");

    await ctx.db.patch(user._id, {
      currentCharacterId: characterId,
    });

    if (!oldCharacter) throw new Error("Old character not found.");

    await ctx.db.patch(oldCharacter._id, {
      clerkId: undefined,
    });

    await ctx.db.patch(newCharacter._id, {
      clerkId: clerkId,
    });
  },
});
