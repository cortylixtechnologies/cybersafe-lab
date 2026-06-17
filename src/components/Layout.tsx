import { Link, useRouterState } from "@tanstack/react-router";
import { Shield, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { MODULES, useProgress } from "@/lib/progress";

export function Layout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { pct, completed, total, done } = useProgress();
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 glass">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 h-16">
          <Link to="/" className="flex min-w-0 items-center gap-2.5">
            <div className="shrink-0 grid place-items-center h-9 w-9 rounded-lg bg-[image:var(--gradient-cyber)] shadow-[var(--shadow-neon)]">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-bold tracking-tight">CyberSafe Awareness Lab</div>
              <div className="hidden sm:block text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Training • Simulation • Awareness
              </div>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3 min-w-[180px]">
              <div className="text-xs text-muted-foreground tabular-nums">
                {completed}/{total}
              </div>
              <div className="h-1.5 w-32 rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full bg-[image:var(--gradient-cyber)] transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
            <button
              onClick={() => setOpen((v) => !v)}
              className="grid place-items-center h-9 w-9 rounded-md border border-border hover:bg-accent"
              aria-label="Menu"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
        {open && (
          <nav className="border-t border-border bg-card/90 backdrop-blur">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className={`px-3 py-2 rounded-md text-sm hover:bg-accent ${path === "/" ? "bg-accent text-neon" : ""}`}
              >
                Home
              </Link>
              {MODULES.map((m) => (
                <Link
                  key={m.id}
                  to={m.path}
                  onClick={() => setOpen(false)}
                  className={`px-3 py-2 rounded-md text-sm hover:bg-accent flex items-center justify-between gap-2 ${path === m.path ? "bg-accent text-neon" : ""}`}
                >
                  <span className="truncate">{m.label}</span>
                  {done[m.id] && <span className="text-[10px] text-[color:var(--color-success)]">✓</span>}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 text-xs text-muted-foreground flex flex-wrap gap-2 justify-between">
          <div>
            <span className="text-foreground font-semibold">CyberSafe Awareness Lab</span> — for
            education only. All scenarios are simulations.
          </div>
          <div>No data collected. Stay safe online.</div>
        </div>
      </footer>
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-4xl text-center mb-10 sm:mb-14">
      <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-neon">
        {eyebrow}
      </div>
      <h1 className="mt-4 text-3xl sm:text-5xl font-bold tracking-tight">{title}</h1>
      <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">{description}</p>
    </div>
  );
}

export function ModuleComplete({ id, nextPath, nextLabel }: { id: string; nextPath?: string; nextLabel?: string }) {
  const { complete, done } = useProgress();
  return (
    <div className="mt-10 flex flex-wrap gap-3 items-center justify-center">
      <button
        onClick={() => complete(id)}
        className="px-5 py-2.5 rounded-md bg-[image:var(--gradient-cyber)] text-primary-foreground text-sm font-semibold hover:opacity-90 transition"
      >
        {done[id] ? "✓ Marked complete" : "Mark module complete"}
      </button>
      {nextPath && (
        <Link
          to={nextPath}
          className="px-5 py-2.5 rounded-md border border-border text-sm hover:bg-accent"
        >
          Next: {nextLabel} →
        </Link>
      )}
    </div>
  );
}
