import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { MODULES, useProgress } from "@/lib/progress";
import {
  Shield, Fish, KeyRound, Link2, Smartphone, Users, Image as ImageIcon, Wifi, ListChecks, ArrowRight, Sparkles, Lock, Eye, MessageSquare, Database,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CyberSafe Awareness Lab — Think Before You Click" },
      { name: "description", content: "Free interactive cybersecurity awareness training: phishing, passwords, 2FA, Wi-Fi safety, social engineering and more." },
    ],
  }),
  component: Home,
});

const ICONS: Record<string, any> = {
  phishing: Fish, passwords: KeyRound, "url-inspect": Link2, "2fa": Smartphone,
  social: Users, metadata: ImageIcon, wifi: Wifi, smishing: MessageSquare,
  breach: Database, quiz: ListChecks,
};

const DESC: Record<string, string> = {
  phishing: "Spot fake login pages and suspicious requests before they trick you.",
  passwords: "Test password strength and learn what makes a passphrase resilient.",
  "url-inspect": "Tell legitimate websites apart from clever look-alike domains.",
  "2fa": "See how a second factor stops attackers, even if your password leaks.",
  social: "Discover how attackers piece together public info to target you.",
  metadata: "Understand hidden data inside the photos and files you share.",
  wifi: "Choose safe networks and avoid rogue hotspots in public places.",
  smishing: "Tap a scam SMS on a 3D phone and watch what the attacker collects.",
  breach: "See what leaks in a data breach and how to recover fast.",
  quiz: "Test your knowledge with a 20-question awareness challenge.",
};

function Home() {
  const { pct, completed, total } = useProgress();
  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-16 sm:pt-24 pb-20">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-neon animate-pulse-glow">
                <Sparkles className="h-3 w-3" /> Awareness • Not an attack tool
              </div>
              <h1 className="mt-5 text-4xl sm:text-6xl font-bold tracking-tight leading-[1.05]">
                Think Before <br />
                You <span className="neon-text">Click.</span>
              </h1>
              <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-xl">
                Cybersecurity is a habit, not a product. The CyberSafe Awareness Lab guides you
                through hands-on simulations — phishing, passwords, 2FA, Wi-Fi safety — so the
                next suspicious link doesn't catch you off guard.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/phishing"
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[image:var(--gradient-cyber)] text-primary-foreground font-semibold shadow-[var(--shadow-neon)] hover:opacity-95 transition"
                >
                  Start Training <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition" />
                </Link>
                <Link
                  to="/quiz"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-border hover:bg-accent transition"
                >
                  Skip to Quiz
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-6 text-xs text-muted-foreground">
                <div className="flex items-center gap-2"><Lock className="h-4 w-4 text-neon" /> No accounts, no tracking</div>
                <div className="flex items-center gap-2"><Eye className="h-4 w-4 text-neon" /> All scenarios simulated</div>
                <div className="flex items-center gap-2"><Shield className="h-4 w-4 text-neon" /> Beginner friendly</div>
              </div>
            </div>

            {/* Dashboard card */}
            <div className="relative">
              <div className="glass rounded-2xl p-6 shadow-[var(--shadow-soft)] neon-border animate-float">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Your training</div>
                    <div className="mt-1 text-2xl font-bold">Awareness Dashboard</div>
                  </div>
                  <div className="grid place-items-center h-12 w-12 rounded-xl bg-[image:var(--gradient-cyber)]">
                    <Shield className="h-6 w-6 text-primary-foreground" />
                  </div>
                </div>
                <div className="mt-6">
                  <div className="flex items-end justify-between">
                    <div className="text-4xl font-bold tabular-nums neon-text">{pct}%</div>
                    <div className="text-xs text-muted-foreground">{completed} of {total} modules</div>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full bg-[image:var(--gradient-cyber)] transition-all" style={{ width: `${pct}%` }} />
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-4 gap-2">
                  {MODULES.map((m) => {
                    const Icon = ICONS[m.id] ?? Shield;
                    return (
                      <Link
                        key={m.id}
                        to={m.path}
                        className="group grid place-items-center aspect-square rounded-lg border border-border hover:bg-accent hover:border-primary/50 transition"
                        title={m.label}
                      >
                        <Icon className="h-5 w-5 text-muted-foreground group-hover:text-neon transition" />
                      </Link>
                    );
                  })}
                </div>
              </div>
              <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-[image:var(--gradient-cyber)] opacity-20 blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="flex items-end justify-between flex-wrap gap-3 mb-8">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-neon">Training Modules</div>
            <h2 className="mt-2 text-2xl sm:text-4xl font-bold">Ten ways to stay safer online</h2>
          </div>
          <div className="text-sm text-muted-foreground max-w-sm">
            Work through them in order, or jump to the topic you need most. Your progress is saved on this device.
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MODULES.map((m, i) => {
            const Icon = ICONS[m.id] ?? Shield;
            return (
              <Link
                key={m.id}
                to={m.path}
                className="group relative rounded-xl border border-border bg-card p-5 hover:border-primary/60 hover:shadow-[var(--shadow-neon)] transition overflow-hidden"
              >
                <div className="absolute top-3 right-3 text-[10px] text-muted-foreground tabular-nums">
                  0{i + 1}
                </div>
                <div className="grid place-items-center h-11 w-11 rounded-lg bg-secondary group-hover:bg-[image:var(--gradient-cyber)] transition">
                  <Icon className="h-5 w-5 text-neon group-hover:text-primary-foreground transition" />
                </div>
                <div className="mt-4 font-semibold">{m.label}</div>
                <div className="mt-1 text-xs text-muted-foreground leading-relaxed">{DESC[m.id]}</div>
                <div className="mt-4 inline-flex items-center gap-1 text-xs text-neon">
                  Open module <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}
