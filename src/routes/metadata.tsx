import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHeader, ModuleComplete } from "@/components/Layout";
import { useState } from "react";
import { Image as ImageIcon, MapPin, Calendar, Smartphone, Camera } from "lucide-react";

export const Route = createFileRoute("/metadata")({
  head: () => ({ meta: [{ title: "Metadata Privacy Demonstration — CyberSafe" }, { name: "description", content: "Discover the hidden data inside photos and files — and what it can reveal about you." }] }),
  component: Metadata,
});

function Metadata() {
  const [up, setUp] = useState(false);
  return (
    <Layout>
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-16">
        <PageHeader
          eyebrow="Module 06 • Metadata"
          title="What your photos secretly say"
          description="Most photos carry hidden metadata — when, where, and how they were taken. This is a simulation; no real file is read."
        />

        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="aspect-[4/3] rounded-lg border border-dashed border-border bg-gradient-to-br from-secondary to-card grid place-items-center text-center p-6">
              {up ? (
                <div>
                  <ImageIcon className="h-12 w-12 mx-auto text-neon" />
                  <div className="mt-3 text-sm font-mono">vacation_2024.jpg</div>
                  <div className="text-xs text-muted-foreground">3.2 MB · 4032×3024</div>
                </div>
              ) : (
                <div>
                  <Camera className="h-10 w-10 mx-auto text-muted-foreground" />
                  <div className="mt-3 text-sm">Drag a photo here</div>
                  <div className="text-xs text-muted-foreground">(simulation — nothing is uploaded)</div>
                </div>
              )}
            </div>
            <button
              onClick={() => setUp(true)}
              className="mt-4 w-full py-2.5 rounded-md bg-[image:var(--gradient-cyber)] text-primary-foreground font-semibold"
            >
              {up ? "Re-scan photo" : "Simulate upload"}
            </button>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <div className="text-xs uppercase tracking-[0.2em] text-neon">EXIF metadata (simulated)</div>
            <div className={`mt-4 space-y-3 transition-opacity ${up ? "opacity-100" : "opacity-40"}`}>
              <Row icon={Calendar} label="Date taken" value="2024-08-14 18:42:11" />
              <Row icon={Smartphone} label="Device" value="iPhone 14 Pro · iOS 17.4" />
              <Row icon={Camera} label="Camera" value="Main · f/1.78 · 1/120s · ISO 64" />
              <Row icon={MapPin} label="GPS location" value="48.8584° N, 2.2945° E (Paris, FR)" highlight />
            </div>
            {up && (
              <div className="mt-5 text-xs text-muted-foreground rounded-md border border-[color:var(--color-warning)]/40 bg-[color:var(--color-warning)]/5 p-3">
                A stranger receiving this photo could now know where you were, when, and the
                exact device you used.
              </div>
            )}
          </div>
        </div>

        <div className="mt-10 grid sm:grid-cols-3 gap-4">
          <Tip title="Strip metadata">Most phones offer "Share without location" in the share sheet.</Tip>
          <Tip title="Be careful with home photos">A single GPS-tagged photo near your home reveals where you live.</Tip>
          <Tip title="Documents too">Word, PDF and Office files store author names and edit history.</Tip>
        </div>

        <ModuleComplete id="metadata" nextPath="/wifi" nextLabel="Public Wi-Fi" />
      </section>
    </Layout>
  );
}

function Row({ icon: Icon, label, value, highlight }: any) {
  return (
    <div className={`flex items-start gap-3 p-3 rounded-md border border-border ${highlight ? "bg-[color:var(--color-warning)]/5" : "bg-background/40"}`}>
      <Icon className={`h-4 w-4 mt-0.5 ${highlight ? "text-[color:var(--color-warning)]" : "text-neon"}`} />
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{label}</div>
        <div className="text-sm font-mono truncate">{value}</div>
      </div>
    </div>
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
