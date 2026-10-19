"use client";

import { FormEvent, useMemo, useState } from "react";
import { Workspace } from "./workspace";

type Mode = "register" | "login";

type AuthenticatedUser = {
  name: string;
  email: string;
};

type FormState = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: ""
};

export function AuthPanel() {
  const [mode, setMode] = useState<Mode>("register");
  const [form, setForm] = useState<FormState>(initialForm);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<AuthenticatedUser | null>(null);

  const fields = useMemo(() => {
    const common = [
      { id: "email", label: "Email", type: "email", autoComplete: "email" },
      {
        id: "password",
        label: "Password",
        type: "password",
        autoComplete: mode === "register" ? "new-password" : "current-password"
      }
    ];

    if (mode === "login") {
      return common;
    }

    return [
      { id: "name", label: "Name", type: "text", autoComplete: "name" },
      ...common,
      {
        id: "confirmPassword",
        label: "Confirm password",
        type: "password",
        autoComplete: "new-password"
      }
    ];
  }, [mode]);

  function updateField(id: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [id]: value }));
    setMessage("");
    setIsError(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    setIsError(false);

    try {
      const response = await fetch(`/api/${mode}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });
      const result = (await response.json()) as {
        message?: string;
        user?: AuthenticatedUser;
      };

      if (!response.ok) {
        throw new Error(result.message ?? "Something went wrong.");
      }

      if (!result.user?.name || !result.user.email) {
        throw new Error("We couldn't load your account details. Please try again.");
      }

      setUser(result.user);
    } catch (error) {
      setIsError(true);
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function changeMode(nextMode: Mode) {
    setMode(nextMode);
    setForm(initialForm);
    setMessage("");
    setIsError(false);
  }

  if (user) {
    return (
      <Workspace
        user={user}
        onSignOut={() => {
          setUser(null);
          setForm(initialForm);
        }}
      />
    );
  }

  return (
    <main className="auth-page">
      <div className="auth-brand">
        <span className="brand-mark" aria-hidden="true">N</span>
        <span>northstar<span className="brand-dot">.</span></span>
      </div>
      <section className="auth-card" aria-labelledby="auth-heading">
        <div className="auth-eyebrow">YOUR ENGINEERING WORKSPACE</div>
      <div className="mode-tabs" role="tablist" aria-label="Authentication mode">
        <button
          className={`mode-tab ${mode === "register" ? "is-active" : ""}`}
          type="button"
          role="tab"
          aria-selected={mode === "register"}
          onClick={() => changeMode("register")}
        >
          Register
        </button>
        <button
          className={`mode-tab ${mode === "login" ? "is-active" : ""}`}
          type="button"
          role="tab"
          aria-selected={mode === "login"}
          onClick={() => changeMode("login")}
        >
          Login
        </button>
      </div>

      <h2 className="auth-heading" id="auth-heading">
        {mode === "register" ? "Register" : "Login"}
      </h2>

      <form className="auth-form" onSubmit={handleSubmit}>
        {fields.map((field) => (
          <label className="field-group" key={field.id}>
            <span className="field-label">
              <span className="required">*</span> {field.label}
            </span>
            <input
              className="field-input"
              type={field.type}
              value={form[field.id as keyof FormState]}
              autoComplete={field.autoComplete}
              required
              onChange={(event) =>
                updateField(field.id as keyof FormState, event.target.value)
              }
            />
          </label>
        ))}

        <div className="form-divider" />

        <button className="submit-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Please wait..." : mode === "register" ? "Register" : "Login"}
        </button>

        <p className={`form-message ${isError ? "is-error" : ""}`} role="status">
          {message}
        </p>
      </form>
      </section>
      <p className="auth-footnote">A little more focus. A lot more momentum.</p>
    </main>
  );
}
