import "server-only";

/**
 * Check if email signup should be disabled based on environment variable
 * @returns true if signup should be disabled, false if allowed (default)
 */
export function isEmailSignupDisabled(): boolean {
  return process.env.BETTER_AUTH_ALLOW_EMAIL_SIGNUP === "false";
}
