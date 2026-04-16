"use client";

import { FormEvent, useState } from "react";

type SubmitState = "idle" | "sending" | "success" | "error";

function encodeFormData(formData: FormData): string {
  const params = new URLSearchParams();
  for (const [key, value] of formData.entries()) {
    params.append(key, typeof value === "string" ? value : value.name);
  }
  return params.toString();
}

export function ContactForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitState("sending");

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);

    try {
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeFormData(formData),
      });

      if (!response.ok) {
        throw new Error("Netlify form request failed");
      }

      formElement.reset();
      setSubmitState("success");
    } catch {
      setSubmitState("error");
    }
  };

  return (
    <form className="contact-form" name="contact" onSubmit={handleSubmit}>
      <input type="hidden" name="form-name" value="contact" />

      <p className="sr-only">
        <label htmlFor="bot-field">
          Do not fill this field
          <input id="bot-field" name="bot-field" />
        </label>
      </p>

      <label className="form-field" htmlFor="company">
        Company
      </label>
      <input
        id="company"
        name="company"
        className="form-input"
        type="text"
        placeholder="Company name"
        required
      />

      <label className="form-field" htmlFor="contact-person">
        Contact person
      </label>
      <input
        id="contact-person"
        name="contactPerson"
        className="form-input"
        type="text"
        placeholder="Your name"
        required
      />

      <label className="form-field" htmlFor="contact-email">
        Work email
      </label>
      <input
        id="contact-email"
        name="contactEmail"
        className="form-input"
        type="email"
        placeholder="name@company.com"
        required
      />

      <label className="form-field" htmlFor="project-message">
        Project notes
      </label>
      <textarea
        id="project-message"
        name="projectMessage"
        className="form-input form-textarea"
        placeholder="Tell me about your project, stack, and timeline..."
        required
      />

      <button type="submit" className="button button-primary" disabled={submitState === "sending"}>
        {submitState === "sending" ? "Sending..." : "Send request"}
      </button>
      <p className="contact-form-note">
        After submit, I receive this message in email from the portfolio form.
      </p>

      {submitState === "success" ? (
        <p className="contact-form-feedback contact-form-feedback-success">
          Thank you. Your request has been sent.
        </p>
      ) : null}
      {submitState === "error" ? (
        <p className="contact-form-feedback contact-form-feedback-error">
          Something went wrong. Please try again or send direct email.
        </p>
      ) : null}
    </form>
  );
}
