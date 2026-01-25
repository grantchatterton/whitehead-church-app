export default function EmailTwoFactorTemplate({
  twoFactorCode,
}: {
  twoFactorCode: string;
}) {
  return (
    <>
      <p>Your two-factor authentication code is:</p>
      <h2>{twoFactorCode}</h2>
      <p>Please enter this code to complete your sign-in.</p>
    </>
  );
}
