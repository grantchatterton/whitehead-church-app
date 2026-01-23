import "server-only";

/**
 * Check if email signup should be enabled based on environment variable
 * @returns true if signup should be enabled (default), false if disabled
 */
export function isEmailSignupEnabled(): boolean {
  return process.env.BETTER_AUTH_ALLOW_EMAIL_SIGNUP !== "false";
}
