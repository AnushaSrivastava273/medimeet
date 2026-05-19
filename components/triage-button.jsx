"use client";

import { Button } from "@/components/ui/button";

export function TriageButton() {
  return (
    <Button
      size="lg"
      className="bg-emerald-600 text-white hover:bg-emerald-700 font-semibold"
      onClick={() => window.dispatchEvent(new CustomEvent("open-triage-chat"))}
    >
      Try AI Symptom Checker 🩺
    </Button>
  );
}
