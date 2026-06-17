import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHeader, ModuleComplete } from "@/components/Layout";
import { useState } from "react";
import { AlertTriangle, Lock, ShieldAlert, CheckCircle2, X } from "lucide-react";

export const Route = createFileRoute("/phishing")({
  head: () => ({ meta: [{ title: "Phishing Awareness Simulator — CyberSafe" }, { name: "description", content: "Spot fake login pages, suspicious URLs, and urgency tricks. A safe phishing simulation for training." }] }),
  component: Phishing,
});

function Phishing() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  return (
    <Layout>
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
        <PageHeader
          eyebrow="Module 01 • Phishing"
          title="Phishing Awareness Simulator"
          description="The page below is designed to look like a real login screen — but it's a safe simulation. Try entering anything to see what would happen."
        />

        {!submitted ? (
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
            {/* Fake browser */}
            <div className="rounded-xl border border-border bg-card overflow-hidden shadow-[var(--shadow-soft)]">
              <div className="flex items-center gap-2 px-3 py-2 bg-secondary border-b border-border">
                <span className="h-3 w-3 rounded-full bg-destructive/70" />
                <span className="h-3 w-3 rounded-full bg-[color:var(--color-warning)]/70" />
                <span className="h-3 w-3 rounded-full bg-[color:var(--color-success)]/70" />
                <div className="ml-3 flex-1 truncate text-xs font-mono px-3 py-1 rounded-md bg-background/60 border border-border">
                  <span className="text-destructive">http://</span>secure-login.app1e-id.com/verify
                </div>
              </div>
              <div className="p-8 sm:p-12 text-center">
                <div className="text-2xl font-bold mb-1">Verify your Apple ID</div>
                <div className="text-xs text-destructive mb-6">⚠ Your account will be locked in 24 hours.</div>
                <form
                  onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                  className="max-w-sm mx-auto space-y-3 text-left"
                >
                  <input
                    type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="Apple ID email"
                    className="w-full px-3 py-2.5 rounded-md bg-background border border-border focus:outline-none focus:border-primary"
                  />
                  <input
                    type="password" required value={pw} onChange={(e) => setPw(e.target.value)}
                    placeholder="Password"
                    className="w-full px-3 py-2.5 rounded-md bg-background border border-border focus:outline-none focus:border-primary"
                  />
                  <button className="w-full py-2.5 rounded-md bg-primary text-primary-foreground font-semibold">
                    Sign In Now
                  </button>
                  <div className="text-[10px] text-muted-foreground text-center">
                    (Don't worry — nothing is saved.)
                  </div>
                </form>
              </div>
            </div>

            {/* Hints */}
            <div className="rounded-xl border border-border glass p-6">
              <div className="text-xs uppercase tracking-[0.2em] text-neon">Suspicious signs already visible</div>
              <ul className="mt-4 space-y-3 text-sm">
                <Sign title="Look-alike domain">"app1e-id.com" uses a number "1" instead of an "l".</Sign>
                <Sign title="Missing HTTPS">The URL starts with <code>http://</code> — no lock, no encryption.</Sign>
                <Sign title="Fake urgency">"Account locked in 24 hours" pressures you to act fast.</Sign>
                <Sign title="Unexpected request">Real services rarely ask you to "re-verify" via email links.</Sign>
              </ul>
            </div>
          </div>
        ) : (
          <Result onReset={() => { setSubmitted(false); setEmail(""); setPw(""); }} />
        )}

        <div className="mt-12 grid sm:grid-cols-2 gap-4">
          <Tip icon={ShieldAlert} title="If a message creates panic, slow down.">
            Attackers rely on urgency. Pause and verify by visiting the site directly.
          </Tip>
          <Tip icon={Lock} title="Type the address yourself.">
            Open a new tab and type the real domain. Don't click links inside suspicious emails.
          </Tip>
          <Tip icon={AlertTriangle} title="Hover before you click.">
            On desktop, hover over a link to preview the real destination URL.
          </Tip>
          <Tip icon={CheckCircle2} title="When in doubt, throw it out.">
            Delete the message. Real companies will not penalise you for being cautious.
          </Tip>
        </div>

        <ModuleComplete id="phishing" nextPath="/passwords" nextLabel="Password Security" />
      </section>
    </Layout>
  );
}

function Sign({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <div className="shrink-0 mt-0.5 h-5 w-5 rounded-full bg-destructive/15 text-destructive grid place-items-center text-xs">!</div>
      <div>
        <div className="font-semibold text-sm">{title}</div>
        <div className="text-xs text-muted-foreground">{children}</div>
      </div>
    </li>
  );
}

function Tip({ icon: Icon, title, children }: any) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <Icon className="h-5 w-5 text-neon" />
      <div className="mt-2 font-semibold text-sm">{title}</div>
      <div className="text-xs text-muted-foreground mt-1">{children}</div>
    </div>
  );
}

function Result({ onReset }: { onReset: () => void }) {
  return (
    <div className="rounded-2xl border border-[color:var(--color-warning)]/40 bg-[color:var(--color-warning)]/5 p-8 sm:p-12 text-center">
      <div className="mx-auto grid place-items-center h-14 w-14 rounded-full bg-[color:var(--color-warning)]/15 mb-4">
        <ShieldAlert className="h-7 w-7 text-[color:var(--color-warning)]" />
      </div>
      <h3 className="text-2xl font-bold">That was a phishing simulation.</h3>
      <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
        Nothing was stored, sent, or saved. In a real attack, the credentials you typed would have
        been delivered straight to an attacker. <strong>Never enter credentials on untrusted websites.</strong>
      </p>
      <div className="mt-6 grid sm:grid-cols-3 gap-3 max-w-2xl mx-auto text-left">
        <Tip icon={X} title="Wrong domain">app1e-id.com is not apple.com</Tip>
        <Tip icon={X} title="No HTTPS">http:// = not encrypted</Tip>
        <Tip icon={X} title="Urgency trap">"24 hours" pressure tactic</Tip>
      </div>
      <button onClick={onReset} className="mt-8 px-5 py-2.5 rounded-md border border-border hover:bg-accent text-sm">
        Try again
      </button>
    </div>
  );
}
