import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    username: v.string(),
    currentCharacterId: v.optional(v.string()), // Reference to the current active character
  }),

  characters: defineTable({
    clerkId: v.optional(v.string()), // Reference to the owning user (only one at a time)
    name: v.string(), // Character name
    faction: v.string(), // Character's faction (e.g., magic, tech)
    description: v.string(), // Description or backstory
    imageUrl: v.string(), // URL to AI-generated image
    price: v.optional(v.number()), // If listed in the marketplace, price in in-game currency
    listed: v.optional(v.boolean()), // Whether the character is listed for sale
  }),

  marketplace: defineTable({
    characterId: v.string(), // Reference to the character being listed
    sellerId: v.string(), // User listing the character
    price: v.number(), // Price for the character
    listedDate: v.number(), // Date it was listed
    status: v.string(), // "available", "sold", etc.
  }).index("by_price", ["price"]),
});
