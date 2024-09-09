import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const create = mutation({
    args: {
        title: v.string(),
        description: v.string(),
        subcategoryId: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        console.log("Auth identity:", identity);  // Log the identity for debugging

        if (!identity) {
            console.error("Authentication failed: identity is null");
            throw new Error("Authentication failed. Please ensure you're logged in and try again.");
        }

        console.log("User token identifier:", identity.tokenIdentifier);

        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) =>
                q.eq("tokenIdentifier", identity.tokenIdentifier)
            )
            .unique();

        if (!user) {
            console.error("User not found for token:", identity.tokenIdentifier);
            throw new Error("User not found. Please check your account setup or contact support.");
        }

        if (!args.title.trim()) {
            throw new Error("Title is required.");
        }

        if (!args.description.trim()) {
            throw new Error("Description is required.");
        }

        const gigId = await ctx.db.insert("gigs", {
            title: args.title.trim(),
            description: args.description.trim(),
            subcategoryId: args.subcategoryId as Id<"subcategories">,
            sellerId: user._id,
            published: false,
            clicks: 0,
        });

        return gigId;
    },
});