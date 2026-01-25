import LinkButton from "@/components/ui/LinkButton";

export default function EmailVerifiedPage() {
  return (
    <div className="text-center">
      <h1>Email Verified Successfully</h1>
      <p>Your email has been verified. You can now log in to your account.</p>
      <LinkButton href="/login">Go to Login</LinkButton>
    </div>
  );
}
