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
