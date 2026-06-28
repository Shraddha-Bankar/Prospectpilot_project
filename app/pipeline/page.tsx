"use client";

import { useEffect, useState } from "react";
import { getPipeline, updatePipelineStage, removeFromPipeline } from "@/lib/storage";
import type { PipelineEntry, PipelineStage } from "@/lib/storage";
import { Rocket, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";

const STAGES: { key: PipelineStage; label: string; color: string }[] = [
  { key: "new", label: "New", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  { key: "contacted", label: "Contacted", color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
  { key: "interested", label: "Interested", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
  { key: "proposal_sent", label: "Proposal Sent", color: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
  { key: "won", label: "Won ✓", color: "bg-green-500/10 text-green-400 border-green-500/20" },
  { key: "lost", label: "Lost", color: "bg-red-500/10 text-red-400 border-red-500/20" },
];

export default function PipelinePage() {
  const [entries, setEntries] = useState<PipelineEntry[]>([]);

  useEffect(() => { setEntries(getPipeline()); }, []);

  function moveStage(leadId: string, stage: PipelineStage) {
    setEntries(updatePipelineStage(leadId, stage));
  }

  function remove(leadId: string) {
    setEntries(removeFromPipeline(leadId));
  }

  const byStage = (stage: PipelineStage) => entries.filter((e) => e.stage === stage);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-background/80 backdrop-blur sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm">
            <ArrowLeft className="h-4 w-4" />Back
          </Link>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
              <Rocket className="h-4 w-4 text-primary-foreground" strokeWidth={1.5} />
            </div>
            <span className="font-display text-lg">ProspectPilot — Pipeline</span>
          </div>
          <span className="ml-auto text-xs text-muted-foreground">{entries.length} leads</span>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {entries.length === 0 ? (
          <div className="text-center py-24 text-muted-foreground">
            <p className="text-lg">No leads in pipeline yet.</p>
            <Link href="/" className="text-primary hover:underline text-sm mt-2 inline-block">
              ← Go back and add leads
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {STAGES.map(({ key, label, color }) => (
              <div key={key} className="space-y-3">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium ${color}`}>
                  {label} <span className="opacity-60">({byStage(key).length})</span>
                </div>
                {byStage(key).map((entry) => (
                  <div key={entry.lead.id} className="border border-border rounded-lg p-4 bg-card space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-medium text-sm">{entry.lead.name}</div>
                        <div className="text-xs text-muted-foreground">{entry.lead.category} · {entry.lead.city}</div>
                      </div>
                      <button onClick={() => remove(entry.lead.id)} className="text-muted-foreground hover:text-destructive transition-colors mt-0.5">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Score:</span>
                      <span className="text-xs font-mono font-semibold text-primary">{entry.lead.score}</span>
                    </div>
                    <select
                      value={entry.stage}
                      onChange={(e) => moveStage(entry.lead.id, e.target.value as PipelineStage)}
                      className="w-full text-xs bg-background border border-border rounded-md px-2 py-1.5 text-foreground"
                    >
                      {STAGES.map((s) => (
                        <option key={s.key} value={s.key}>{s.label}</option>
                      ))}
                    </select>
                  </div>
                ))}
                {byStage(key).length === 0 && (
                  <div className="border border-dashed border-border rounded-lg p-4 text-center text-xs text-muted-foreground">Empty</div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
