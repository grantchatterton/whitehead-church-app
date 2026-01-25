"use client";

import { useRouter } from "next/navigation";

import TwoFactorModal from "@/components/ui/modals/TwoFactorModal";

export default function Page() {
  const router = useRouter();

  function handleVerified() {
    router.push("/");
  }

  function handleCancelled() {
    router.back();
  }

  return (
    <TwoFactorModal onVerified={handleVerified} onCancelled={handleCancelled} />
  );
}
