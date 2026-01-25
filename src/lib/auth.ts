import "server-only";

import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { twoFactor } from "better-auth/plugins";
import type { Mongoose } from "mongoose";

import EmailTwoFactorTemplate from "@/components/ui/templates/EmailTwoFactorTemplate";
import EmailVerificationTemplate from "@/components/ui/templates/EmailVerificationTemplate";

import { isEmailSignupEnabled } from "./auth-config";
import { sendEmail } from "./email";
import dbConnect from "./mongodb";

const client = ((await dbConnect()) as Mongoose).connection.getClient();

const appName = process.env.NEXT_PUBLIC_APP_TITLE!;

export const auth = betterAuth({
  appName,
  database: mongodbAdapter(client.db(), { client }),
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      void sendEmail({
        to: user.email,
        subject: `Verify your email address for ${appName}`,
        react: EmailVerificationTemplate({ verificationUrl: url }),
      });
    },
    sendOnSignIn: false,
    sendOnSignUp: false,
    autoSignInAfterVerification: false,
    
  },
  emailAndPassword: {
    enabled: true,
    disableSignUp: !isEmailSignupEnabled(),
    requireEmailVerification: true,
  },
  plugins: [
    twoFactor({
      otpOptions: {
        async sendOTP({ user, otp }, ctx) {
          // send otp to user
          void sendEmail({
            to: user.email,
            subject: `Your OTP for ${appName}`,
            react: EmailTwoFactorTemplate({ twoFactorCode: otp }),
          });
        },
      },
      skipVerificationOnEnable: true,
    }),
  ],
});
