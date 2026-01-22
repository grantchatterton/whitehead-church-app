export default function EmailTwoFactorTemplate({ otp }: { otp: string }) {
  return <p>Your login code is: {otp}</p>;
}
