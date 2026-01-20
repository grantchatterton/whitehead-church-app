import "server-only";

import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import type { Mongoose } from "mongoose";

import dbConnect from "./mongodb";

const client = ((await dbConnect()) as Mongoose).connection.getClient();

// Check if email signup is allowed (defaults to true if not set)
const allowEmailSignup =
  process.env.BETTER_AUTH_ALLOW_EMAIL_SIGNUP !== "false";

export const auth = betterAuth({
  database: mongodbAdapter(client.db()),
  emailAndPassword: {
    enabled: allowEmailSignup,
  },
});
