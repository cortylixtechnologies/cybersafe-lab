import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHeader, ModuleComplete } from "@/components/Layout";
import { useState } from "react";
import { Check, X, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/url-inspect")({
  head: () => ({ meta: [{ title: "URL Inspection Challenge — CyberSafe" }, { name: "description", content: "Practice spotting safe vs. suspicious URLs, look-alike domains, and homograph tricks." }] }),
  component: UrlInspect,
});

type Item = { url: string; safe: boolean; why: string };

const ITEMS: Item[] = [
  { url: "https://www.google.com/maps", safe: true, why: "Official Google domain over HTTPS." },
  { url: "http://paypa1.com/login", safe: false, why: "Look-alike: '1' (one) instead of 'l'. Also missing HTTPS." },
  { url: "https://accounts.google.com", safe: true, why: "A real subdomain of google.com." },
  { url: "https://accounts-google.security-check.io", safe: false, why: "The real domain is 'security-check.io'. 'accounts-google' is just a prefix." },
  { url: "https://amaz0n-deals.shop/offer", safe: false, why: "Numeric '0' replaces 'o', and the real domain is unrelated to amazon.com." },
  { url: "https://github.com/lovable", safe: true, why: "Legitimate GitHub domain over HTTPS." },
  { url: "https://micros0ft-support.help/reset", safe: false, why: "Misspelled brand name and unrelated TLD." },
  { url: "https://en.wikipedia.org/wiki/Phishing", safe: true, why: "Genuine Wikipedia subdomain." },
];

function UrlInspect() {
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const submit = (i: number, v: boolean) => setAnswers((a) => ({ ...a, [i]: v }));
  const reset = () => setAnswers({});
  const answered = Object.keys(answers).length;
  const correct = Object.entries(answers).filter(([i, v]) => ITEMS[+i].safe === v).length;

  return (
    <Layout>
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-16">
        <PageHeader
          eyebrow="Module 03 • URLs"
          title="URL Inspection Challenge"
          description="For each address below, decide whether you'd trust it. Look carefully — some are crafted to look almost identical to the real thing."
        />

        <div className="rounded-xl border border-border glass p-4 sm:p-5 mb-6 flex flex-wrap items-center gap-3 justify-between">
          <div className="text-sm">
            Score: <span className="font-bold neon-text">{correct}</span> / {answered} answered
            <span className="text-muted-foreground"> · {ITEMS.length} total</span>
          </div>
          <button onClick={reset} className="text-xs inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border hover:bg-accent">
            <RotateCcw className="h-3 w-3" /> Reset
          </button>
        </div>

        <div className="space-y-3">
          {ITEMS.map((it, i) => {
            const a = answers[i];
            const answered = a !== undefined;
            const right = answered && a === it.safe;
            return (
              <div key={i} className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 items-center p-4">
                  <div className="min-w-0 font-mono text-sm truncate" title={it.url}>{it.url}</div>
                  <div className="flex gap-2">
                    <button
                      disabled={answered}
                      onClick={() => submit(i, true)}
                      className={`px-3 py-1.5 rounded-md text-xs border transition ${
                        answered
                          ? a === true
                            ? right ? "bg-[color:var(--color-success)]/20 border-[color:var(--color-success)] text-[color:var(--color-success)]" : "bg-destructive/20 border-destructive text-destructive"
                            : "border-border opacity-40"
                          : "border-border hover:border-primary hover:bg-accent"
                      }`}
                    >
                      Safe
                    </button>
                    <button
                      disabled={answered}
                      onClick={() => submit(i, false)}
                      className={`px-3 py-1.5 rounded-md text-xs border transition ${
                        answered
                          ? a === false
                            ? right ? "bg-[color:var(--color-success)]/20 border-[color:var(--color-success)] text-[color:var(--color-success)]" : "bg-destructive/20 border-destructive text-destructive"
                            : "border-border opacity-40"
                          : "border-border hover:border-primary hover:bg-accent"
                      }`}
                    >
                      Suspicious
                    </button>
                  </div>
                </div>
                {answered && (
                  <div className={`px-4 py-3 text-xs border-t border-border flex items-start gap-2 ${right ? "bg-[color:var(--color-success)]/5" : "bg-destructive/5"}`}>
                    {right ? <Check className="h-4 w-4 text-[color:var(--color-success)] shrink-0 mt-0.5" /> : <X className="h-4 w-4 text-destructive shrink-0 mt-0.5" />}
                    <div>
                      <span className="font-semibold">{right ? "Correct." : `Actually ${it.safe ? "safe" : "suspicious"}.`}</span>{" "}
                      <span className="text-muted-foreground">{it.why}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <ModuleComplete id="url-inspect" nextPath="/two-factor" nextLabel="Two-Factor Auth" />
      </section>
    </Layout>
  );
}
