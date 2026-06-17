import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHeader, ModuleComplete } from "@/components/Layout";
import { useMemo, useState } from "react";
import { AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/social-engineering")({
  head: () => ({ meta: [{ title: "Social Engineering Demonstration — CyberSafe" }, { name: "description", content: "See how attackers piece together everyday public information into a targeted attack." }] }),
  component: Social,
});

const QUESTIONS = [
  { key: "pet", label: "What's your first pet's name?", placeholder: "e.g. Buddy" },
  { key: "birth", label: "Year you were born?", placeholder: "e.g. 1996" },
  { key: "team", label: "Favorite sports team?", placeholder: "e.g. Lakers" },
  { key: "city", label: "City you grew up in?", placeholder: "e.g. Mumbai" },
];

function Social() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState(false);
  const filled = Object.values(answers).filter(Boolean).length;

  const guesses = useMemo(() => {
    const p = answers.pet || "Buddy";
    const b = answers.birth || "1996";
    const t = answers.team || "Lakers";
    const c = answers.city || "Mumbai";
    return [`${p}${b}`, `${p}@${b}`, `${t}${b}!`, `${c}${b}`, `${p}_${t}`, `I<3${t}${b.slice(-2)}`];
  }, [answers]);

  return (
    <Layout>
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-16">
        <PageHeader
          eyebrow="Module 05 • Social engineering"
          title="The data you share is the attack."
          description="Answer these light, friendly questions — the kind you see in social media quizzes. Then see how an attacker could weaponise them."
        />

        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-border bg-card p-6 space-y-4">
            {QUESTIONS.map((q) => (
              <label key={q.key} className="block">
                <div className="text-sm font-medium mb-1.5">{q.label}</div>
                <input
                  value={answers[q.key] || ""}
                  onChange={(e) => setAnswers((a) => ({ ...a, [q.key]: e.target.value }))}
                  placeholder={q.placeholder}
                  className="w-full px-3 py-2.5 rounded-md bg-background border border-border focus:outline-none focus:border-primary text-sm"
                />
              </label>
            ))}
            <button
              disabled={filled < 2}
              onClick={() => setRevealed(true)}
              className="w-full mt-2 py-2.5 rounded-md bg-[image:var(--gradient-cyber)] text-primary-foreground font-semibold disabled:opacity-50"
            >
              Reveal what an attacker sees
            </button>
          </div>

          <div className={`rounded-xl border p-6 transition ${revealed ? "border-[color:var(--color-warning)] bg-[color:var(--color-warning)]/5" : "border-border bg-card/50"}`}>
            <div className="flex items-center gap-2">
              <AlertTriangle className={`h-5 w-5 ${revealed ? "text-[color:var(--color-warning)]" : "text-muted-foreground"}`} />
              <h3 className="font-semibold">Likely password guesses</h3>
            </div>
            {revealed ? (
              <>
                <p className="mt-2 text-sm text-muted-foreground">
                  Attackers feed personal facts into a list and try them automatically. Here's what
                  your answers might produce:
                </p>
                <ul className="mt-4 grid grid-cols-2 gap-2">
                  {guesses.map((g) => (
                    <li key={g} className="font-mono text-sm px-3 py-2 rounded-md bg-background border border-border">
                      {g}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 text-xs text-muted-foreground">
                  The same answers also defeat many "security questions" used by support agents.
                </div>
              </>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">
                Fill in a few answers and press <em>Reveal</em>.
              </p>
            )}
          </div>
        </div>

        <div className="mt-10 rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold">Why oversharing is risky</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground list-disc pl-5">
            <li>Birthdays, pet names and hometowns often appear in passwords and security answers.</li>
            <li>Attackers stitch together LinkedIn, Instagram, and public posts into a profile.</li>
            <li>"Fun" quizzes ("your first car + your street = your band name") harvest the same data.</li>
            <li>Use fictional answers for security questions and a password manager to keep them.</li>
          </ul>
        </div>

        <ModuleComplete id="social" nextPath="/metadata" nextLabel="Metadata Privacy" />
      </section>
    </Layout>
  );
}
