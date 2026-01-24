import AppModal from "./AppModal";

export default function EmailVerificationRequiredModal() {
  return (
    <AppModal
      title="Email Verification Required"
      message="Please verify your email address to continue. Check your inbox for a verification email."
    />
  );
}
