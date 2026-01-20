import "server-only";

/**
 * Check if email signup is allowed based on environment variable
 * @returns true if signup is allowed (default), false if disabled
 */
export function isEmailSignupAllowed(): boolean {
  return process.env.BETTER_AUTH_ALLOW_EMAIL_SIGNUP !== "false";
}
