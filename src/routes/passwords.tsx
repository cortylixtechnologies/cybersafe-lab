import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHeader, ModuleComplete } from "@/components/Layout";
import { useMemo, useState } from "react";
import { Eye, EyeOff, Check, X } from "lucide-react";

export const Route = createFileRoute("/passwords")({
  head: () => ({ meta: [{ title: "Password Security Lab — CyberSafe" }, { name: "description", content: "Test password strength and learn best practices for creating safer passwords and passphrases." }] }),
  component: Passwords,
});

function score(pw: string) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (pw.length >= 12) s++;
  if (pw.length >= 16) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return Math.min(s, 6);
}

const LEVELS = [
  { label: "Empty", color: "bg-muted", text: "—", time: "—" },
  { label: "Very Weak", color: "bg-destructive", text: "text-destructive", time: "Could be guessed instantly" },
  { label: "Weak", color: "bg-destructive/80", text: "text-destructive", time: "Could be guessed quickly" },
  { label: "Medium", color: "bg-[color:var(--color-warning)]", text: "text-[color:var(--color-warning)]", time: "Would take a while to guess" },
  { label: "Strong", color: "bg-[color:var(--color-success)]/80", text: "text-[color:var(--color-success)]", time: "Much harder to guess" },
  { label: "Very Strong", color: "bg-[color:var(--color-success)]", text: "text-[color:var(--color-success)]", time: "Extremely hard to guess" },
  { label: "Excellent", color: "bg-neon", text: "text-neon", time: "Practically unguessable" },
];

function Passwords() {
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const s = useMemo(() => (pw ? score(pw) : 0), [pw]);
  const level = LEVELS[s];

  const checks = [
    { ok: pw.length >= 12, label: "At least 12 characters" },
    { ok: /[A-Z]/.test(pw), label: "Uppercase letter" },
    { ok: /[a-z]/.test(pw), label: "Lowercase letter" },
    { ok: /[0-9]/.test(pw), label: "Number" },
    { ok: /[^A-Za-z0-9]/.test(pw), label: "Symbol" },
  ];

  return (
    <Layout>
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-16">
        <PageHeader
          eyebrow="Module 02 • Passwords"
          title="Password Security Lab"
          description="Type a password to see how strong it is. Nothing leaves your device — this is just a teaching tool."
        />

        <div className="rounded-2xl border border-border glass p-6 sm:p-8">
          <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Test a password</label>
          <div className="mt-2 relative">
            <input
              type={show ? "text" : "password"}
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="Type something..."
              className="w-full px-4 py-3.5 pr-12 rounded-lg bg-background border border-border font-mono focus:outline-none focus:border-primary"
            />
            <button
              onClick={() => setShow((v) => !v)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-foreground"
              aria-label="Toggle visibility"
            >
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          <div className="mt-5">
            <div className="flex items-center justify-between mb-2">
              <div className={`text-sm font-semibold ${level.text}`}>{level.label}</div>
              <div className="text-xs text-muted-foreground">{level.time}</div>
            </div>
            <div className="grid grid-cols-6 gap-1.5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className={`h-2 rounded-full ${i < s ? level.color : "bg-secondary"}`} />
              ))}
            </div>
          </div>

          <div className="mt-6 grid sm:grid-cols-2 gap-2">
            {checks.map((c) => (
              <div key={c.label} className={`flex items-center gap-2 text-sm ${c.ok ? "text-[color:var(--color-success)]" : "text-muted-foreground"}`}>
                {c.ok ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                {c.label}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-4">
          <Card title="Best practices">
            <li>Use a <strong>passphrase</strong> — four random words are easier to remember and harder to crack.</li>
            <li>Use a <strong>different password</strong> for every account.</li>
            <li>Store them in a reputable <strong>password manager</strong>.</li>
            <li>Turn on <strong>two-factor authentication</strong> wherever possible.</li>
            <li>Change a password immediately if a service reports a breach.</li>
          </Card>
          <Card title="Common mistakes">
            <li>Reusing the same password across sites.</li>
            <li>Adding "123" or "!" to a weak base word.</li>
            <li>Using names, birthdays, or sports teams.</li>
            <li>Saving passwords in plain text files or sticky notes.</li>
            <li>Sharing passwords over chat or email.</li>
          </Card>
        </div>

        <ModuleComplete id="passwords" nextPath="/url-inspect" nextLabel="URL Inspection" />
      </section>
    </Layout>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="font-semibold">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground list-disc pl-5">{children}</ul>
    </div>
  );
}
