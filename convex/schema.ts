import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    username: v.string(),
    currentCharacterId: v.optional(v.string()), // Reference to the current active character
    silver: v.number(), // Current silver in the user's wallet
  }),

  characters: defineTable({
    clerkId: v.optional(v.string()), // Reference to the owning user (only one at a time)
    name: v.string(), // Character name
    faction: v.string(), // Character's faction (e.g., magic, tech)
    description: v.string(), // Description or backstory
    imageUrl: v.string(), // URL to AI-generated image
  }),
});
