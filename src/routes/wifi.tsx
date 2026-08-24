import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHeader, ModuleComplete } from "@/components/Layout";
import { useState } from "react";
import { Wifi, Lock, Unlock, AlertTriangle, Check } from "lucide-react";

export const Route = createFileRoute("/wifi")({
  head: () => ({ meta: [{ title: "Public Wi-Fi Security Demo — CyberSafe" }, { name: "description", content: "Practice choosing safer Wi-Fi networks and learn how rogue hotspots work." }] }),
  component: WifiDemo,
});

const NETS = [
  { name: "Airport_Free_WiFi", secured: false, signal: 4, safe: false,
    why: "An open, look-alike network with no password. Often a rogue hotspot run by an attacker to capture traffic." },
  { name: "Airport Official WiFi", secured: true, signal: 3, safe: true,
    why: "Matches the official name displayed at the help desk and requires a captive-portal login. Safest choice — but still use HTTPS." },
  { name: "Cafe Guest Network", secured: true, signal: 3, safe: true,
    why: "Password-protected guest network from the cafe staff. Generally fine for browsing — avoid banking unless on a VPN." },
  { name: "Free_Public_WiFi", secured: false, signal: 2, safe: false,
    why: "Generic open SSID. Almost always either misconfigured or a trap." },
];

function WifiDemo() {
  const [picked, setPicked] = useState<number | null>(null);
  const net = picked !== null ? NETS[picked] : null;

  return (
    <Layout>
      <section className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16">
        <PageHeader
          eyebrow="Module 07 • Wi-Fi"
          title="You're at the airport. Which Wi-Fi do you join?"
          description="Tap a network below. We'll explain what each one means and whether it's a safe choice."
        />

        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="px-5 py-3 border-b border-border text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Available networks
          </div>
          <ul>
            {NETS.map((n, i) => {
              const active = picked === i;
              return (
                <li key={n.name}>
                  <button
                    onClick={() => setPicked(i)}
                    className={`w-full grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-5 py-4 text-left border-b border-border last:border-b-0 transition ${active ? "bg-accent" : "hover:bg-accent/60"}`}
                  >
                    <div className={`grid place-items-center h-10 w-10 rounded-lg ${active ? "bg-[image:var(--gradient-cyber)]" : "bg-secondary"}`}>
                      <Wifi className={`h-5 w-5 ${active ? "text-primary-foreground" : "text-neon"}`} />
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold truncate">{n.name}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-2">
                        {n.secured ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
                        {n.secured ? "Secured" : "Open"} · Signal {"▮".repeat(n.signal)}{"▯".repeat(4 - n.signal)}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">Connect</div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {net && (
          <div className={`mt-6 rounded-xl border p-6 ${net.safe ? "border-[color:var(--color-success)]/40 bg-[color:var(--color-success)]/5" : "border-destructive/40 bg-destructive/5"}`}>
            <div className="flex items-start gap-3">
              {net.safe
                ? <Check className="h-5 w-5 text-[color:var(--color-success)] mt-0.5" />
                : <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />}
              <div>
                <div className="font-semibold">{net.safe ? "Reasonable choice." : "Risky choice."}</div>
                <p className="text-sm text-muted-foreground mt-1">{net.why}</p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          <Tip title="Verify the SSID">Ask staff for the exact network name — attackers create look-alikes like “Airport_Free_WiFi”.</Tip>
          <Tip title="Use HTTPS or a VPN">A VPN encrypts everything you send, even on hostile networks.</Tip>
          <Tip title="Disable auto-connect">Your phone will silently join known SSIDs anywhere. Turn that off.</Tip>
          <Tip title="Avoid sensitive logins">Don't access banking on unknown Wi-Fi. Use mobile data instead.</Tip>
        </div>

        <ModuleComplete id="wifi" nextPath="/smishing" nextLabel="Smishing 3D Phone" />
      </section>
    </Layout>
  );
}

function Tip({ title, children }: any) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="font-semibold text-sm">{title}</div>
      <div className="text-xs text-muted-foreground mt-1">{children}</div>
    </div>
  );
}
