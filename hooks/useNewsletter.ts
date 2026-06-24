"use client";

import { isValidEmail } from "@/utils/email";
import { useState, type FormEvent } from "react";

export function useNewsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const changeEmail = (value: string) => {
    setEmail(value);
    setError("");
    setIsSuccess(false);
  };

  const subscribe = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      setEmail("");
      setError("Invalid email address");
      setIsSuccess(false);
      return;
    }

    if (!isValidEmail(normalizedEmail)) {
      setEmail("");
      setError("Invalid email address");
      setIsSuccess(false);
      return;
    }

    setError("");
    setIsSuccess(false);
    setIsSubmitting(true);

    await new Promise((resolve) => window.setTimeout(resolve, 900));

    setEmail("");
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return {
    email,
    error,
    isSuccess,
    isSubmitting,
    changeEmail,
    subscribe,
  };
}
