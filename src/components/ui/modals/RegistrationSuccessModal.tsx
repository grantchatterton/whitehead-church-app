import AppModal from "./AppModal";

export default function RegistrationSuccessModal() {
  return (
    <AppModal
      title="Registration Successful"
      message="Your account has been created successfully. You can now log in."
      link={{ href: "/login", text: "Go to Login" }}
    />
  );
}
