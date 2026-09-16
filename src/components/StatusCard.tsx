type StatusCardProps = {
  milestone: string
  detail: string
}

/**
 * Painel simples confirmando que a fundação está de pé. Não representa
 * nenhum dado real de sistema — é só um marcador visual para este marco.
 * Poderá futuramente refletir status reais (conexões, publicações, etc.).
 */
export function StatusCard({ milestone, detail }: StatusCardProps) {
  return (
    <div className="rounded-xl border border-line bg-paper-raised p-5">
      <div className="flex items-center gap-2">
        <span
          className="h-2 w-2 shrink-0 rounded-full bg-flow"
          aria-hidden="true"
        />
        <p className="text-sm font-medium text-ink">Sistema funcionando</p>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
        <span className="font-medium text-ink">{milestone}</span> — {detail}
      </p>
    </div>
  )
}
