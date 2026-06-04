'use client';

import { useState } from 'react';
import { Mail, MessageSquare, Send, Check } from 'lucide-react';

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="container-page section-padding py-12">
      <div className="mx-auto max-w-xl">
        <div className="text-center">
          <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-neon">
            <MessageSquare className="h-6 w-6 text-white" />
          </span>
          <h1 className="font-display text-3xl font-extrabold text-white">Get in touch</h1>
          <p className="mt-2 text-text-muted">Questions, game submissions or partnerships — we&apos;d love to hear from you.</p>
        </div>

        {sent ? (
          <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-accent/30 bg-accent/10 p-8 text-center">
            <Check className="h-10 w-10 text-accent" />
            <h2 className="font-display text-lg font-bold text-white">Message sent!</h2>
            <p className="text-sm text-text-muted">Thanks for reaching out. We&apos;ll get back to you soon.</p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="mt-8 space-y-4 rounded-2xl border border-white/10 bg-surface p-6"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name"><input required className="field" placeholder="Your name" /></Field>
              <Field label="Email"><input required type="email" className="field" placeholder="you@example.com" /></Field>
            </div>
            <Field label="Subject"><input required className="field" placeholder="How can we help?" /></Field>
            <Field label="Message">
              <textarea required rows={5} className="field resize-none" placeholder="Tell us more..." />
            </Field>
            <button type="submit" className="btn-neon w-full">
              <Send className="h-4 w-4" /> Send message
            </button>
          </form>
        )}

        <p className="mt-6 flex items-center justify-center gap-2 text-sm text-text-muted">
          <Mail className="h-4 w-4" /> hello@gameverse.example.com
        </p>
      </div>

      <style>{`
        .field {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(13,17,23,0.6);
          padding: 0.625rem 0.875rem;
          font-size: 0.875rem;
          color: #fff;
          outline: none;
        }
        .field::placeholder { color: rgba(154,164,178,0.6); }
        .field:focus { border-color: rgba(108,92,231,0.6); }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-text-muted">{label}</span>
      {children}
    </label>
  );
}
