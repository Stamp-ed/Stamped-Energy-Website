"use client";

import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/Button";
import { landingContent } from "@/lib/content";
import { cn } from "@/lib/utils";

type ContactFormState = {
  name: string;
  company: string;
  location: string;
  billSize: string;
  whatsapp: string;
};

const initialState: ContactFormState = {
  name: "",
  company: "",
  location: "",
  billSize: "",
  whatsapp: "",
};

type FieldConfig = {
  id: keyof ContactFormState;
  label: string;
  type?: string;
  required?: boolean;
};

const fields: FieldConfig[] = [
  { id: "name", label: landingContent.contactForm.fields.name, required: true },
  { id: "company", label: landingContent.contactForm.fields.company, required: true },
  { id: "location", label: landingContent.contactForm.fields.location, required: true },
  { id: "billSize", label: landingContent.contactForm.fields.billSize, required: true },
  { id: "whatsapp", label: landingContent.contactForm.fields.whatsapp, required: true },
];

export function ContactForm() {
  const [formState, setFormState] = useState<ContactFormState>(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        const payload = (await response.json()) as { error?: string };
        throw new Error(payload.error ?? landingContent.contactForm.errorMessage);
      }

      setStatus("success");
      setFormState(initialState);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : landingContent.contactForm.errorMessage,
      );
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {fields.map((field) => (
        <div key={field.id}>
          <label
            htmlFor={field.id}
            className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant"
          >
            {field.label}
          </label>
          <input
            id={field.id}
            name={field.id}
            type={field.type ?? "text"}
            required={field.required}
            value={formState[field.id]}
            onChange={(event) =>
              setFormState((current) => ({
                ...current,
                [field.id]: event.target.value,
              }))
            }
            className={cn(
              "h-12 w-full rounded-md border border-outline-variant bg-surface-lowest px-4 text-sm text-on-surface",
              "outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/25",
            )}
          />
        </div>
      ))}

      <Button type="submit" variant="primary" className="w-full" disabled={status === "loading"}>
        {status === "loading" ? "Submitting..." : landingContent.contactForm.submitLabel}
      </Button>

      {status === "success" ? (
        <p className="text-sm font-medium text-primary">{landingContent.contactForm.successMessage}</p>
      ) : null}

      {status === "error" ? (
        <p className="text-sm font-medium text-error">{errorMessage}</p>
      ) : null}
    </form>
  );
}
