import type { RankedLead } from "./types";

export type PipelineStage = "new" | "contacted" | "interested" | "proposal_sent" | "won" | "lost";

export interface PipelineEntry {
  lead: RankedLead;
  stage: PipelineStage;
  addedAt: string;
}

const KEY = "prospectpilot_pipeline";

function load(): PipelineEntry[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(KEY) ?? "[]"); }
  catch { return []; }
}

function save(e: PipelineEntry[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(e));
}

export function getPipeline(): PipelineEntry[] { return load(); }

export function addToPipeline(lead: RankedLead): PipelineEntry[] {
  const e = load();
  if (e.find((x) => x.lead.id === lead.id)) return e;
  const u = [...e, { lead, stage: "new" as PipelineStage, addedAt: new Date().toISOString() }];
  save(u); return u;
}

export function updatePipelineStage(leadId: string, stage: PipelineStage): PipelineEntry[] {
  const e = load().map((x) => x.lead.id === leadId ? { ...x, stage } : x);
  save(e); return e;
}

export function removeFromPipeline(leadId: string): PipelineEntry[] {
  const e = load().filter((x) => x.lead.id !== leadId);
  save(e); return e;
}
