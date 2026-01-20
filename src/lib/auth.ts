import "server-only";

import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import type { Mongoose } from "mongoose";

import { isEmailSignupAllowed } from "./auth-config";
import dbConnect from "./mongodb";

const client = ((await dbConnect()) as Mongoose).connection.getClient();

export const auth = betterAuth({
  database: mongodbAdapter(client.db()),
  emailAndPassword: {
    enabled: isEmailSignupAllowed(),
  },
});
