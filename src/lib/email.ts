import "server-only";

import { Resend } from "resend";

let resendInstance: Resend | null = null;

function getResendInstance() {
  if (!resendInstance) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY environment variable is not set");
    }

    resendInstance = new Resend(apiKey);
  }

  return resendInstance;
}

export async function sendEmail({
  to,
  subject,
  react,
}: {
  to: string;
  subject: string;
  react: React.ReactNode;
}) {
  return getResendInstance().emails.send({
    from: process.env.APP_EMAIL_ADDRESS!,
    to,
    subject,
    react,
  });
}
