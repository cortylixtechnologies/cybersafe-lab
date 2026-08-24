import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHeader, ModuleComplete } from "@/components/Layout";
import { useState } from "react";
import {
  MessageSquare, ShieldAlert, Lock, Wifi, BatteryFull, Signal, RotateCcw,
  Fingerprint, MapPin, Contact, KeyRound, CreditCard, Eye,
} from "lucide-react";

export const Route = createFileRoute("/smishing")({
  head: () => ({
    meta: [
      { title: "Smishing 3D Phone Demo — CyberSafe Awareness Lab" },
      { name: "description", content: "Interactive 3D phone simulation: see exactly what an attacker collects when you tap a malicious SMS link." },
      { property: "og:title", content: "Smishing 3D Phone Demo — CyberSafe Awareness Lab" },
      { property: "og:description", content: "Tap a fake delivery SMS on a 3D phone and watch the attacker's dashboard fill up — all simulated." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Smishing,
});

type Step = "sms" | "page" | "loot";

const LOOT = [
  { icon: KeyRound, label: "Username & password", value: "j.doe@example.com / ••••••••", risk: "Reused on 4 other sites" },
  { icon: Fingerprint, label: "Device fingerprint", value: "iPhone · iOS 18.4 · Safari", risk: "Used to bypass 'new device' checks" },
  { icon: MapPin, label: "Approximate location", value: "Nairobi, KE (IP geolocation)", risk: "Makes follow-up scams believable" },
  { icon: Contact, label: "Phone number", value: "+254 7•• ••• 421", risk: "Sold to other scam operators" },
  { icon: CreditCard, label: "Card details entered", value: "**** **** **** 4417", risk: "Instant test charges" },
  { icon: Eye, label: "Session cookie", value: "sid=eyJhbGciOi…", risk: "Log in without your password or 2FA" },
];

function Smishing() {
  const [step, setStep] = useState<Step>("sms");
  const [pw, setPw] = useState("");
  const [tilt, setTilt] = useState({ x: -8, y: 14 });

  return (
    <Layout>
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
        <PageHeader
          eyebrow="Module 09 • Smishing"
          title="A text arrives. What does tapping it really cost?"
          description="Drag around the 3D phone, open the SMS, and follow the fake link. Nothing you type is sent anywhere — the attacker's dashboard is a simulation."
        />

        <div className="grid lg:grid-cols-[420px_minmax(0,1fr)] gap-10 items-start">
          {/* 3D phone */}
          <div
            className="relative mx-auto"
            style={{ perspective: "1200px" }}
            onMouseMove={(e) => {
              const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
              setTilt({
                x: -((e.clientY - r.top) / r.height - 0.5) * 20,
                y: ((e.clientX - r.left) / r.width - 0.5) * 30,
              });
            }}
            onMouseLeave={() => setTilt({ x: -8, y: 14 })}
          >
            <div className="absolute inset-8 rounded-[3rem] bg-[image:var(--gradient-cyber)] opacity-25 blur-3xl" />
            <div
              className="relative w-[300px] h-[610px] rounded-[2.6rem] border border-border bg-card p-3 shadow-[var(--shadow-soft)] transition-transform duration-200 ease-out"
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transformStyle: "preserve-3d",
                boxShadow: "0 40px 80px -30px oklch(0.05 0.05 250 / 0.9), 0 0 0 2px oklch(0.32 0.05 250 / 0.6), inset 0 0 0 1px oklch(0.72 0.2 235 / 0.15)",
              }}
            >
              <div className="h-full w-full rounded-[2.1rem] bg-background overflow-hidden relative flex flex-col">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 h-6 w-24 rounded-full bg-card z-20" />
                <div className="flex items-center justify-between px-5 pt-3 pb-2 text-[10px] text-muted-foreground">
                  <span className="tabular-nums">09:41</span>
                  <span className="flex items-center gap-1"><Signal className="h-3 w-3" /><Wifi className="h-3 w-3" /><BatteryFull className="h-3.5 w-3.5" /></span>
                </div>

                <div className="flex-1 overflow-y-auto px-4 pb-4">
                  {step === "sms" && (
                    <div>
                      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground py-3">Messages</div>
                      <div className="rounded-2xl border border-border bg-card p-4">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <MessageSquare className="h-3.5 w-3.5 text-neon" /> +1 (415) 555-0148
                        </div>
                        <p className="mt-2 text-sm leading-relaxed">
                          [PostaLink] Your parcel PK-88213 is on hold — a $2.99 customs fee is unpaid.
                          Reschedule within 12h or it returns to sender:
                        </p>
                        <button
                          onClick={() => setStep("page")}
                          className="mt-2 text-sm text-neon underline break-all text-left"
                        >
                          http://postalink-delivery.secure-pay24.co/track
                        </button>
                        <div className="mt-3 text-[10px] text-muted-foreground">Tap the link to continue the simulation.</div>
                      </div>
                    </div>
                  )}

                  {step === "page" && (
                    <div>
                      <div className="mt-3 flex items-center gap-2 rounded-lg bg-secondary px-3 py-2 text-[10px] text-muted-foreground">
                        <ShieldAlert className="h-3.5 w-3.5 text-destructive" />
                        <span className="truncate">postalink-delivery.secure-pay24.co</span>
                      </div>
                      <div className="mt-4 text-center">
                        <div className="mx-auto grid place-items-center h-12 w-12 rounded-xl bg-[image:var(--gradient-cyber)]">
                          <Lock className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div className="mt-3 font-semibold">PostaLink Sign in</div>
                        <div className="text-[11px] text-muted-foreground">Confirm your identity to release the parcel</div>
                      </div>
                      <div className="mt-4 space-y-2">
                        <input
                          readOnly
                          value="j.doe@example.com"
                          className="w-full rounded-md border border-border bg-secondary px-3 py-2 text-sm"
                        />
                        <input
                          type="password"
                          value={pw}
                          onChange={(e) => setPw(e.target.value)}
                          placeholder="Password (type anything — it stays here)"
                          className="w-full rounded-md border border-border bg-secondary px-3 py-2 text-sm"
                        />
                        <button
                          onClick={() => setStep("loot")}
                          className="w-full rounded-md bg-[image:var(--gradient-cyber)] text-primary-foreground py-2.5 text-sm font-semibold"
                        >
                          Pay $2.99 &amp; release parcel
                        </button>
                      </div>
                      <p className="mt-3 text-[10px] text-muted-foreground">
                        Simulation only — nothing is transmitted or stored.
                      </p>
                    </div>
                  )}

                  {step === "loot" && (
                    <div className="h-full grid place-items-center text-center py-16">
                      <div>
                        <ShieldAlert className="mx-auto h-10 w-10 text-destructive" />
                        <div className="mt-3 font-semibold">Page not found</div>
                        <p className="mt-1 text-[11px] text-muted-foreground px-4">
                          The scam site redirects you to a dead page so nothing feels wrong.
                          Meanwhile, the attacker already has everything →
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="h-1.5 w-28 mx-auto mb-2 rounded-full bg-secondary" />
              </div>
            </div>
          </div>

          {/* Attacker panel */}
          <div>
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              <div className="px-5 py-3 border-b border-border flex items-center justify-between">
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Attacker's harvest panel (simulated)
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${step === "loot" ? "bg-destructive/15 text-destructive" : "bg-secondary text-muted-foreground"}`}>
                  {step === "loot" ? "6 items captured" : "waiting for victim"}
                </span>
              </div>
              <ul className="divide-y divide-border">
                {LOOT.map((l, i) => {
                  const revealed = step === "loot";
                  return (
                    <li
                      key={l.label}
                      className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 px-5 py-4 transition-all"
                      style={{ opacity: revealed ? 1 : 0.35, transitionDelay: `${i * 90}ms` }}
                    >
                      <div className={`grid place-items-center h-9 w-9 rounded-lg ${revealed ? "bg-destructive/15" : "bg-secondary"}`}>
                        <l.icon className={`h-4 w-4 ${revealed ? "text-destructive" : "text-muted-foreground"}`} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold">{l.label}</div>
                        <div className="text-xs font-mono truncate text-muted-foreground">
                          {revealed ? l.value : "•••••••••••••"}
                        </div>
                        {revealed && <div className="text-[11px] text-destructive mt-0.5">{l.risk}</div>}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {step === "loot" && (
              <div className="mt-6 rounded-xl border border-destructive/40 bg-destructive/5 p-6">
                <div className="font-semibold">One tap, six problems.</div>
                <p className="text-sm text-muted-foreground mt-1">
                  The fee was never real — the $2.99 charge exists only to make you enter card details.
                  The stolen session cookie is the worst part: it can let an attacker in even with 2FA enabled.
                </p>
              </div>
            )}

            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <Tip title="Couriers don't text random links">Track parcels by typing the courier's official site yourself.</Tip>
              <Tip title="Read the domain right-to-left">The real owner is the part before the first single slash: <span className="font-mono">secure-pay24.co</span>, not PostaLink.</Tip>
              <Tip title="Tiny fees are the tell">Scammers ask for pocket change so you don't stop to think.</Tip>
              <Tip title="If you tapped it">Change the password, revoke active sessions, and watch your card statement.</Tip>
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={() => { setStep("sms"); setPw(""); }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border text-sm hover:bg-accent"
              >
                <RotateCcw className="h-4 w-4" /> Replay simulation
              </button>
            </div>
          </div>
        </div>

        <ModuleComplete id="smishing" nextPath="/breach" nextLabel="Data Breach Impact" />
      </section>
    </Layout>
  );
}

function Tip({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="font-semibold text-sm">{title}</div>
      <div className="text-xs text-muted-foreground mt-1">{children}</div>
    </div>
  );
}
