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
        silver: 0,
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

    await ctx.db.patch(newCharacter._id, {
      clerkId: clerkId,
    });

    if (!oldCharacter) return;

    await ctx.db.patch(oldCharacter._id, {
      clerkId: undefined,
    });
  },
});

export const addSilver = mutation({
  args: {
    clerkId: v.string(),
    silver: v.number(),
  },

  handler: async (ctx, { clerkId, silver }) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), clerkId))
      .unique();

    if (!user) throw new Error("User not found.");

    await ctx.db.patch(user._id, {
      silver: user.silver ? user.silver + silver : silver,
    });
  },
});
