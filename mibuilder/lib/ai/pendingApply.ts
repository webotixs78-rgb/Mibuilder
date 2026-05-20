/** Session key used when applying AI output from /app/ai into the workspace builder. */
export const MI_AI_PENDING_APPLY_KEY = "miAiPendingApply"

export type PendingAiApply = {
  payload: unknown
  mode: "crm" | "automation" | "insights"
}
