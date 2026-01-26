declare global {
  type FormState = {
    status?: "pending" | "success" | "error";
    message?: string;
  };
}

export {};
