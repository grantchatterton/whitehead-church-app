import "server-only";

import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import type { Mongoose } from "mongoose";

import EmailVerificationTemplate from "@/components/auth/EmailVerificationTemplate";

import { isEmailSignupDisabled } from "./auth-config";
import { sendEmail } from "./email";
import dbConnect from "./mongodb";

const client = ((await dbConnect()) as Mongoose).connection.getClient();

export const auth = betterAuth({
  appName: process.env.BETTER_AUTH_APP_NAME,
  database: mongodbAdapter(client.db()),
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      void sendEmail({
        to: user.email,
        subject: "Verify your email address",
        react: EmailVerificationTemplate({ verificationUrl: url }),
      });
    },
    sendOnSignIn: true,
    autoSignInAfterVerification: true,
  },
  emailAndPassword: {
    enabled: true,
    disableSignUp: isEmailSignupDisabled(),
    requireEmailVerification: true,
  },
});
