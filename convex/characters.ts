import { v } from "convex/values";

import { query } from "./_generated/server";

export const getCharacters = query({
  args: {},

  handler: async (ctx) => {
    return await ctx.db.query("characters").collect();
  },
});

export const getAvailableCharacters = query({
  args: {},

  handler: async (ctx) => {
    return await ctx.db
      .query("characters")
      .filter((q) => q.eq(q.field("clerkId"), undefined))
      .collect();
  },
});

export const getCharacter = query({
  args: { clerkId: v.string() },

  handler: async (ctx, { clerkId }) => {
    return await ctx.db
      .query("characters")
      .filter((q) => q.eq(q.field("clerkId"), clerkId))
      .unique();
  },
});
