/**
 * Marca do SocialFlow: um pequeno glifo de "fluxo" (três traços em cadência
 * crescente) seguido do nome do produto. Serve como âncora visual da tela
 * inicial e será reaproveitado no header quando a navegação for introduzida.
 */
export function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="3"
          y="16"
          width="4"
          height="9"
          rx="1"
          fill="var(--color-flow)"
        />
        <rect
          x="12"
          y="10"
          width="4"
          height="15"
          rx="1"
          fill="var(--color-flow)"
        />
        <rect
          x="21"
          y="3"
          width="4"
          height="22"
          rx="1"
          fill="var(--color-flow)"
        />
      </svg>
      <span className="font-display text-lg font-medium tracking-tight text-ink">
        SocialFlow
      </span>
    </div>
  )
}
