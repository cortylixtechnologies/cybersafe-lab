import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHeader, ModuleComplete } from "@/components/Layout";
import { useState } from "react";
import { Database, AlertTriangle, ShieldCheck, Search } from "lucide-react";

export const Route = createFileRoute("/breach")({
  head: () => ({
    meta: [
      { title: "Data Breach Impact Simulator — CyberSafe Awareness Lab" },
      { name: "description", content: "See what leaks when a service you use is breached, and learn the exact recovery steps." },
      { property: "og:title", content: "Data Breach Impact Simulator — CyberSafe Awareness Lab" },
      { property: "og:description", content: "A simulated breach lookup showing which data types leak and what to do next." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Breach,
});

const BREACHES = [
  { name: "ShopNova", year: 2021, records: "12.4M", data: ["Email", "Password hash (weak MD5)", "Home address", "Order history"] },
  { name: "FitTrackr", year: 2022, records: "3.1M", data: ["Email", "Date of birth", "GPS run routes", "Height & weight"] },
  { name: "ChatterBox Forums", year: 2019, records: "48M", data: ["Username", "Email", "Plaintext password", "Private messages"] },
];

function Breach() {
  const [email, setEmail] = useState("");
  const [shown, setShown] = useState(false);

  return (
    <Layout>
      <section className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16">
        <PageHeader
          eyebrow="Module 10 • Breaches"
          title="Your data leaks even when you do nothing wrong"
          description="Type any made-up address to run a simulated breach lookup. No lookup actually happens — the results below are fictional examples."
        />

        <div className="rounded-2xl border border-border bg-card p-6">
          <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Email address (use a fake one)</label>
          <div className="mt-2 flex flex-col sm:flex-row gap-3">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="someone@example.com"
              className="flex-1 rounded-md border border-border bg-secondary px-3 py-2.5 text-sm"
            />
            <button
              onClick={() => setShown(true)}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-[image:var(--gradient-cyber)] text-primary-foreground text-sm font-semibold"
            >
              <Search className="h-4 w-4" /> Run simulated check
            </button>
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">Nothing is sent to a server or stored.</p>
        </div>

        {shown && (
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <span>
                Found in <strong>3 simulated breaches</strong>
                {email.trim() ? <> for <span className="font-mono">{email.trim()}</span></> : null}
              </span>
            </div>
            {BREACHES.map((b) => (
              <div key={b.name} className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2 font-semibold">
                    <Database className="h-4 w-4 text-neon" /> {b.name}
                  </div>
                  <div className="text-xs text-muted-foreground">{b.year} · {b.records} records</div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {b.data.map((d) => (
                    <span key={d} className="text-[11px] px-2 py-1 rounded-full bg-destructive/10 text-destructive border border-destructive/30">{d}</span>
                  ))}
                </div>
              </div>
            ))}

            <div className="rounded-xl border border-[color:var(--color-success)]/40 bg-[color:var(--color-success)]/5 p-6">
              <div className="flex items-center gap-2 font-semibold">
                <ShieldCheck className="h-4 w-4 text-[color:var(--color-success)]" /> Your recovery checklist
              </div>
              <ol className="mt-3 space-y-2 text-sm text-muted-foreground list-decimal pl-5">
                <li>Change that password — and every site where you reused it.</li>
                <li>Turn on 2FA, preferring an authenticator app over SMS.</li>
                <li>Sign out all active sessions in the account's security settings.</li>
                <li>Expect targeted phishing that quotes real order or profile details.</li>
                <li>Use a password manager so one leak never spreads.</li>
              </ol>
            </div>
          </div>
        )}

        <ModuleComplete id="breach" nextPath="/quiz" nextLabel="Final Quiz" />
      </section>
    </Layout>
  );
}
