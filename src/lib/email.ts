import "server-only";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendEmail({
  to,
  subject,
  react,
}: {
  to: string;
  subject: string;
  react: React.ReactNode;
}) {
  return resend.emails.send({
    from: "onboarding@resend.dev",
    to,
    subject,
    react,
  });
}
