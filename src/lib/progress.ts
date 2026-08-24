import { useEffect, useState, useCallback } from "react";

export const MODULES = [
  { id: "phishing", label: "Phishing", path: "/phishing" },
  { id: "passwords", label: "Passwords", path: "/passwords" },
  { id: "url-inspect", label: "URL Inspection", path: "/url-inspect" },
  { id: "2fa", label: "2FA", path: "/two-factor" },
  { id: "social", label: "Social Eng.", path: "/social-engineering" },
  { id: "metadata", label: "Metadata", path: "/metadata" },
  { id: "wifi", label: "Public Wi-Fi", path: "/wifi" },
  { id: "smishing", label: "Smishing 3D", path: "/smishing" },
  { id: "breach", label: "Data Breach", path: "/breach" },
  { id: "quiz", label: "Final Quiz", path: "/quiz" },
] as const;

const KEY = "csal_progress_v1";

function read(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}

export function useProgress() {
  const [done, setDone] = useState<Record<string, boolean>>({});
  useEffect(() => {
    setDone(read());
    const h = () => setDone(read());
    window.addEventListener("storage", h);
    window.addEventListener("csal:progress", h);
    return () => {
      window.removeEventListener("storage", h);
      window.removeEventListener("csal:progress", h);
    };
  }, []);
  const complete = useCallback((id: string) => {
    const next = { ...read(), [id]: true };
    localStorage.setItem(KEY, JSON.stringify(next));
    window.dispatchEvent(new Event("csal:progress"));
    setDone(next);
  }, []);
  const reset = useCallback(() => {
    localStorage.removeItem(KEY);
    window.dispatchEvent(new Event("csal:progress"));
    setDone({});
  }, []);
  const total = MODULES.length;
  const completed = MODULES.filter((m) => done[m.id]).length;
  return { done, complete, reset, total, completed, pct: Math.round((completed / total) * 100) };
}
