"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/config/site";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Status = "idle" | "sending" | "success" | "error";

interface FormState {
  name: string;
  email: string;
  service: string;
  budget: string;
  message: string;
}

const initial: FormState = {
  name: "",
  email: "",
  service: "",
  budget: "",
  message: "",
};

const inputClass =
  "w-full rounded-lg border border-line bg-transparent px-4 py-3.5 text-sm text-fg outline-none transition-colors placeholder:text-muted/70 focus:border-accent";

/** Validated contact form that posts to /api/contact with a success state. */
export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<Status>("idle");

  const set =
    (field: keyof FormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const validate = () => {
    const next: Partial<FormState> = {};
    if (form.name.trim().length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Please enter a valid email.";
    if (!form.service) next.service = "Pick the service you need.";
    if (form.message.trim().length < 20)
      next.message = "Tell me a bit more — at least 20 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    if (!validate()) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      setForm(initial);
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="flex min-h-80 flex-col items-start justify-center gap-4 rounded-lg border border-line bg-surface p-8"
            role="status"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-xl text-bg">
              ✓
            </span>
            <h3 className="font-display text-2xl font-semibold">
              Message sent.
            </h3>
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              Thanks for reaching out — I usually reply within 24 hours.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-2 text-sm uppercase tracking-[0.2em] text-accent underline-offset-4 hover:underline"
            >
              Send another
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: EASE }}
            onSubmit={submit}
            noValidate
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            <Field label="Name" error={errors.name}>
              <input
                className={inputClass}
                value={form.name}
                onChange={set("name")}
                placeholder="Your name"
                autoComplete="name"
              />
            </Field>

            <Field label="Email" error={errors.email}>
              <input
                type="email"
                className={inputClass}
                value={form.email}
                onChange={set("email")}
                placeholder="you@email.com"
                autoComplete="email"
              />
            </Field>

            <Field label="Service" error={errors.service}>
              <select
                className={`${inputClass} appearance-none [&>*:nth-child(n+2)]:bg-surface [&>*:nth-child(n+2)]:text-fg`}
                value={form.service}
                onChange={set("service")}
              >
                <option value="" disabled>
                  Select a service
                </option>
                {siteConfig.formOptions.services.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Budget" error={errors.budget}>
              <select
                className={`${inputClass} appearance-none [&>*:nth-child(n+2)]:bg-surface [&>*:nth-child(n+2)]:text-fg`}
                value={form.budget}
                onChange={set("budget")}
              >
                <option value="" disabled>
                  Select a range (optional)
                </option>
                {siteConfig.formOptions.budgets.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </Field>

            <div className="sm:col-span-2">
              <Field label="Message" error={errors.message}>
                <textarea
                  rows={5}
                  className={`${inputClass} resize-none`}
                  value={form.message}
                  onChange={set("message")}
                  placeholder="Tell me about your brand, your timeline and what you need…"
                />
              </Field>
            </div>

            <div className="flex flex-col items-start gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
              <p aria-live="polite" className="text-sm text-muted">
                {status === "error" && (
                  <span className="text-red-400">
                    Something went wrong — email me directly at{" "}
                    <a className="underline" href={`mailto:${siteConfig.email}`}>
                      {siteConfig.email}
                    </a>
                    .
                  </span>
                )}
              </p>
              <button
                type="submit"
                disabled={status === "sending"}
                data-cursor="link"
                className="rounded-full bg-accent px-8 py-3.5 text-sm font-medium uppercase tracking-[0.12em] text-bg transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Send message"}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-muted">
        {label}
      </span>
      {children}
      {error && (
        <span
          role="alert"
          className="mt-1.5 block text-xs text-red-400"
        >
          {error}
        </span>
      )}
    </label>
  );
}
