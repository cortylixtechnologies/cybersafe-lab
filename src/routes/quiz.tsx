import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout, PageHeader } from "@/components/Layout";
import { useState } from "react";
import { Check, X, Trophy, RotateCcw } from "lucide-react";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/quiz")({
  head: () => ({ meta: [{ title: "Cybersecurity Quiz — CyberSafe" }, { name: "description", content: "20-question awareness quiz covering phishing, passwords, 2FA, mobile security and more." }] }),
  component: Quiz,
});

type Q = { q: string; choices: string[]; answer: number; topic: string; explain: string };

const QUIZ: Q[] = [
  { topic: "Phishing", q: "An email warns your account will be locked in 24 hours and asks you to click a link. What's the safest action?",
    choices: ["Click the link to fix it", "Reply to ask for proof", "Open a new tab and log in directly", "Forward it to everyone"], answer: 2,
    explain: "Going directly to the official site avoids the link entirely." },
  { topic: "Phishing", q: "Which URL is most likely a phishing attempt?",
    choices: ["https://accounts.google.com", "https://www.amazon.com", "http://paypa1.com/login", "https://github.com"], answer: 2,
    explain: "'paypa1' uses a number for 'l', and it's plain HTTP." },
  { topic: "Passwords", q: "Which is the strongest password?",
    choices: ["Summer2024!", "P@ssw0rd", "correct-horse-battery-staple", "12345678"], answer: 2,
    explain: "Long passphrases beat short ones with symbols." },
  { topic: "Passwords", q: "Best place to store many unique passwords:",
    choices: ["A notebook on your desk", "A reputable password manager", "A text file on your desktop", "Browser autofill with no master password"], answer: 1,
    explain: "Password managers encrypt and sync your credentials." },
  { topic: "2FA", q: "Two-factor authentication primarily protects you when:",
    choices: ["Your Wi-Fi is slow", "Your password leaks", "Your battery dies", "You forget your username"], answer: 1,
    explain: "Even with your password, attackers still need the second factor." },
  { topic: "2FA", q: "Which 2FA method is generally safest?",
    choices: ["SMS text codes", "Authenticator app or hardware key", "Security questions", "Caller ID"], answer: 1,
    explain: "Apps/keys aren't vulnerable to SIM-swap attacks." },
  { topic: "Social engineering", q: "A caller claims to be from IT and needs your password to “fix” an issue. You should:",
    choices: ["Give it quickly to help", "Hang up and call IT back on a known number", "Ask for their badge number", "Email it instead"], answer: 1,
    explain: "Real IT never asks for your password." },
  { topic: "Social engineering", q: "Which is the riskiest to share publicly?",
    choices: ["Favorite color", "Your dog's name and birthday", "Favorite movie", "A meme"], answer: 1,
    explain: "Pet name + birthday powers password and security-question attacks." },
  { topic: "Safe browsing", q: "A lock icon in the browser address bar means:",
    choices: ["The site is safe and trusted", "The connection is encrypted", "The site can never be a scam", "Your password is strong"], answer: 1,
    explain: "HTTPS only means encryption — the site itself can still be malicious." },
  { topic: "Safe browsing", q: "Best response to a 'You won a prize!' pop-up:",
    choices: ["Click to claim", "Enter your details", "Close the tab", "Call the number on screen"], answer: 2,
    explain: "These are almost always scams." },
  { topic: "Mobile", q: "Before installing an app, you should:",
    choices: ["Install whatever looks fun", "Check the developer and reviews on the official store", "Sideload from any site", "Disable security warnings"], answer: 1,
    explain: "Stick to official stores and verify the publisher." },
  { topic: "Mobile", q: "Apps asking for unnecessary permissions (e.g. flashlight wanting contacts):",
    choices: ["Are fine if popular", "Should be denied or uninstalled", "Need full access to work", "Are required by Android"], answer: 1,
    explain: "Grant only the permissions an app truly needs." },
  { topic: "Wi-Fi", q: "On open public Wi-Fi, the safest extra protection is:",
    choices: ["Turning off Bluetooth", "Using a reputable VPN", "Posting your location", "Disabling HTTPS"], answer: 1,
    explain: "A VPN encrypts your traffic on hostile networks." },
  { topic: "Wi-Fi", q: "Which SSID is most suspicious at an airport?",
    choices: ["Airport Official WiFi (with portal)", "Free_Airport_WiFi (open, unknown)", "Lounge Members 5G (password)", "GuestWiFi-AB12 (staff confirmed)"], answer: 1,
    explain: "Open look-alike SSIDs are common rogue hotspots." },
  { topic: "Phishing", q: "A text message from “your bank” has a link. Real banks usually:",
    choices: ["Send links to log in", "Ask for your PIN by SMS", "Tell you to open the app or visit the site yourself", "Email passwords"], answer: 2,
    explain: "Reputable banks rarely link to login pages by SMS." },
  { topic: "Passwords", q: "If a service emails you your password in plain text, it means:",
    choices: ["They store it securely", "They likely store passwords insecurely — be careful", "It's encrypted", "Nothing — it's normal"], answer: 1,
    explain: "Proper services store only hashes — they can't email you the original." },
  { topic: "Privacy", q: "Sharing a photo with GPS metadata can reveal:",
    choices: ["Your favorite color", "Where and when it was taken", "Your blood type", "Your IP address"], answer: 1,
    explain: "EXIF data can include precise location and timestamps." },
  { topic: "Safe browsing", q: "Your browser warns 'This connection is not private'. You should:",
    choices: ["Bypass the warning", "Close the tab and avoid the site", "Enter your password anyway", "Disable the warning"], answer: 1,
    explain: "Heed the warning — certificates are there to protect you." },
  { topic: "Updates", q: "Software updates are important because they:",
    choices: ["Add new emojis", "Often patch security vulnerabilities", "Use more battery", "Slow things down"], answer: 1,
    explain: "Updates close known holes that attackers exploit." },
  { topic: "General", q: "If something feels off about a message or website, you should:",
    choices: ["Ignore the feeling", "Slow down and verify through a trusted channel", "Click and find out", "Share it widely"], answer: 1,
    explain: "Trust your instincts — verify before acting." },
];

function Quiz() {
  const [i, setI] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const done = i >= QUIZ.length;
  const { complete } = useProgress();

  const submit = () => {
    if (selected === null) return;
    setAnswers((a) => [...a, selected]);
    setSelected(null);
    setI((x) => x + 1);
  };

  const reset = () => { setI(0); setSelected(null); setAnswers([]); };

  if (done) {
    const correct = answers.filter((a, idx) => a === QUIZ[idx].answer).length;
    const pct = Math.round((correct / QUIZ.length) * 100);
    complete("quiz");
    return (
      <Layout>
        <section className="mx-auto max-w-3xl px-4 sm:px-6 py-16 text-center">
          <div className="mx-auto grid place-items-center h-20 w-20 rounded-full bg-[image:var(--gradient-cyber)] shadow-[var(--shadow-neon)]">
            <Trophy className="h-10 w-10 text-primary-foreground" />
          </div>
          <h1 className="mt-6 text-4xl font-bold">You scored {correct} / {QUIZ.length}</h1>
          <div className="mt-2 text-neon text-lg font-semibold">{pct}%</div>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            {pct >= 80 ? "Excellent — you've built strong cyber hygiene habits."
              : pct >= 60 ? "Good start — review the modules you struggled with."
              : "Keep practicing! Revisit the training modules and try again."}
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <button onClick={reset} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-border hover:bg-accent text-sm">
              <RotateCcw className="h-4 w-4" /> Retake quiz
            </button>
            <Link to="/" className="px-5 py-2.5 rounded-md bg-[image:var(--gradient-cyber)] text-primary-foreground text-sm font-semibold">
              Back to dashboard
            </Link>
          </div>

          <div className="mt-10 text-left rounded-xl border border-border bg-card p-6">
            <h3 className="font-semibold mb-3">Review</h3>
            <ol className="space-y-3 text-sm">
              {QUIZ.map((q, idx) => {
                const ok = answers[idx] === q.answer;
                return (
                  <li key={idx} className="flex gap-3">
                    {ok ? <Check className="h-4 w-4 text-[color:var(--color-success)] shrink-0 mt-1" />
                        : <X className="h-4 w-4 text-destructive shrink-0 mt-1" />}
                    <div>
                      <div className="font-medium">{q.q}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        Correct: <span className="text-foreground">{q.choices[q.answer]}</span> · {q.explain}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>
      </Layout>
    );
  }

  const q = QUIZ[i];
  const pct = Math.round((i / QUIZ.length) * 100);

  return (
    <Layout>
      <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16">
        <PageHeader
          eyebrow={`Final Quiz · ${q.topic}`}
          title={`Question ${i + 1} of ${QUIZ.length}`}
          description="Choose the best answer. You'll get a full review at the end."
        />

        <div className="h-1.5 rounded-full bg-secondary overflow-hidden mb-8">
          <div className="h-full bg-[image:var(--gradient-cyber)] transition-all" style={{ width: `${pct}%` }} />
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <div className="text-lg sm:text-xl font-semibold leading-snug">{q.q}</div>
          <div className="mt-6 grid gap-2">
            {q.choices.map((c, idx) => (
              <button
                key={idx}
                onClick={() => setSelected(idx)}
                className={`text-left px-4 py-3 rounded-lg border transition ${
                  selected === idx
                    ? "border-primary bg-accent neon-border"
                    : "border-border hover:bg-accent/60"
                }`}
              >
                <span className="text-xs text-muted-foreground mr-3 font-mono">{String.fromCharCode(65 + idx)}</span>
                {c}
              </button>
            ))}
          </div>
          <button
            disabled={selected === null}
            onClick={submit}
            className="mt-6 w-full py-3 rounded-md bg-[image:var(--gradient-cyber)] text-primary-foreground font-semibold disabled:opacity-50"
          >
            {i === QUIZ.length - 1 ? "Finish quiz" : "Next question →"}
          </button>
        </div>
      </section>
    </Layout>
  );
}
