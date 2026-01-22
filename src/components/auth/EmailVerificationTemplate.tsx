export default function EmailVerificationTemplate({
  verificationUrl,
}: {
  verificationUrl: string;
}) {
  return (
    <>
      <h1>Verify Your Email Address</h1>
      <p>Please click the link below to verify your email address:</p>
      <a href={verificationUrl}>{verificationUrl}</a>
    </>
  );
}
