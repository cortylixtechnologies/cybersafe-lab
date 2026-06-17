import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHeader, ModuleComplete } from "@/components/Layout";
import { useEffect, useState } from "react";
import { KeyRound, Smartphone, ShieldCheck, CheckCircle2, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/two-factor")({
  head: () => ({ meta: [{ title: "Two-Factor Authentication Simulator — CyberSafe" }, { name: "description", content: "Watch how 2FA adds a second layer of protection even if your password is leaked." }] }),
  component: TwoFA,
});

const STEPS = [
  { icon: KeyRound, title: "Password entered", desc: "You type your password on the login screen." },
  { icon: Smartphone, title: "One-time code requested", desc: "The service sends a code to your phone or authenticator app." },
  { icon: ShieldCheck, title: "Code verified", desc: "Only someone holding your device can supply the correct code." },
  { icon: CheckCircle2, title: "Access granted", desc: "You're in — and an attacker with only your password is locked out." },
];

function TwoFA() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [pw, setPw] = useState("");
  const [otp, setOtp] = useState("");

  useEffect(() => {
    if (!playing) return;
    if (step >= STEPS.length - 1) { setPlaying(false); return; }
    const t = setTimeout(() => setStep((s) => s + 1), 1400);
    return () => clearTimeout(t);
  }, [playing, step]);

  const start = () => { setStep(0); setPlaying(true); };
  const reset = () => { setStep(0); setPlaying(false); setPw(""); setOtp(""); };

  return (
    <Layout>
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-16">
        <PageHeader
          eyebrow="Module 04 • 2FA"
          title="Two-Factor Authentication Simulator"
          description="Two-factor authentication (2FA) means something you know plus something you have. Press play to see it in action."
        />

        <div className="flex flex-wrap gap-3 justify-center mb-8">
          <button onClick={start} className="px-5 py-2.5 rounded-md bg-[image:var(--gradient-cyber)] text-primary-foreground text-sm font-semibold">
            ▶ Play simulation
          </button>
          <button onClick={reset} className="px-5 py-2.5 rounded-md border border-border text-sm inline-flex items-center gap-2">
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </button>
        </div>

        <div className="grid sm:grid-cols-4 gap-3 mb-10">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const active = i <= step && (playing || step > 0);
            return (
              <div key={i} className={`rounded-xl border p-4 transition ${active ? "border-primary bg-card neon-border" : "border-border bg-card/40 opacity-60"}`}>
                <div className={`grid place-items-center h-10 w-10 rounded-lg ${active ? "bg-[image:var(--gradient-cyber)]" : "bg-secondary"}`}>
                  <Icon className={`h-5 w-5 ${active ? "text-primary-foreground" : "text-muted-foreground"}`} />
                </div>
                <div className="mt-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Step {i + 1}</div>
                <div className="font-semibold text-sm">{s.title}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.desc}</div>
              </div>
            );
          })}
        </div>

        {/* Mocked screens */}
        <div className="grid md:grid-cols-2 gap-6">
          <Phone>
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Login</div>
            <div className="mt-2 text-lg font-bold">Sign in</div>
            <input
              type="email" placeholder="you@email.com" value={pw ? "you@email.com" : ""} readOnly
              className="mt-4 w-full px-3 py-2 rounded-md bg-background border border-border text-sm"
            />
            <input
              type="password" placeholder="Password" value={pw} onChange={(e) => setPw(e.target.value)}
              className="mt-2 w-full px-3 py-2 rounded-md bg-background border border-border text-sm"
            />
            <div className={`mt-3 text-xs ${step >= 0 && pw ? "text-[color:var(--color-success)]" : "text-muted-foreground"}`}>
              {step >= 0 && pw ? "✓ Password accepted" : "Step 1 — enter your password"}
            </div>
          </Phone>

          <Phone>
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Authenticator</div>
            <div className="mt-2 text-lg font-bold">One-time code</div>
            <div className="mt-4 text-3xl font-mono tracking-[0.4em] text-center neon-text">
              {step >= 1 ? "428 193" : "— — —"}
            </div>
            <input
              maxLength={6}
              placeholder="Enter 6-digit code"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              className="mt-4 w-full px-3 py-2 rounded-md bg-background border border-border text-center font-mono tracking-widest text-sm"
            />
            <div className={`mt-3 text-xs ${otp.length === 6 || step >= 3 ? "text-[color:var(--color-success)]" : "text-muted-foreground"}`}>
              {otp.length === 6 || step >= 3 ? "✓ Access granted" : "Step 2 — type the code from your device"}
            </div>
          </Phone>
        </div>

        <div className="mt-10 rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold">Why 2FA matters</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            If your password leaks in a data breach, an attacker still needs the second factor — usually a
            code from your phone or a hardware key. Turn on 2FA for email, banking, social media, and
            password managers. An authenticator app is safer than SMS where possible.
          </p>
        </div>

        <ModuleComplete id="2fa" nextPath="/social-engineering" nextLabel="Social Engineering" />
      </section>
    </Layout>
  );
}

function Phone({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-xs rounded-[2rem] border border-border bg-card p-3 shadow-[var(--shadow-soft)]">
      <div className="rounded-[1.5rem] bg-background p-5 min-h-[280px]">{children}</div>
    </div>
  );
}
