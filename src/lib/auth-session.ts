import "server-only";

import { headers } from "next/headers";

import { auth } from "./auth";

export async function verifySession() {
  return await auth.api.getSession({
    headers: await headers(),
  });
}

export async function verifyUserAdmin() {
  const session = await verifySession();
  if (!session?.user?.role?.includes("admin")) {
    return null;
  }

  return session;
}
