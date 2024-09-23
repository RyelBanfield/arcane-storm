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
