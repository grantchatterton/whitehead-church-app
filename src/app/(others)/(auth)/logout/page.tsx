"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import Spinner from "react-bootstrap/Spinner";

import { authClient } from "@/lib/auth-client";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      await authClient.signOut({
        fetchOptions: {
          onSuccess() {
            router.push("/");
          },
        },
      });
    })();
  }, [router]);

  return (
    <div className="text-center">
      <Spinner animation="border" role="status" className="mb-3">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <h1 className="fs-2">Logging out...</h1>
    </div>
  );
}
