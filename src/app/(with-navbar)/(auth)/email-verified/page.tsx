import InfoPage from "@/components/ui/InfoPage";
import LinkButton from "@/components/ui/LinkButton";

export default function EmailVerifiedPage() {
  return (
    <InfoPage title="Email Verified">
      <p>Your email has been verified. You can now log in to your account.</p>
      <LinkButton href="/login">Go to Login</LinkButton>
    </InfoPage>
  );
}
