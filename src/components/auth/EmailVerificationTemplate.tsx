export default function EmailVerificationTemplate({
  verificationUrl,
}: {
  verificationUrl: string;
}) {
  return (
    <>
      <p>Please click the link below to verify your email address:</p>
      <a href={verificationUrl}>{verificationUrl}</a>
    </>
  );
}
