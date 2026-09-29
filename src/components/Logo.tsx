export function Logo() {
  return <div className="flex items-center gap-3">
    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-[0_7px_24px_rgba(39,142,229,.26)]" aria-hidden="true">
      <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none">
        <path d="M5 21.5c4.2 0 5.6-11 10.1-11 3.2 0 3.6 4.5 6.2 4.5 2 0 3-2.1 5.7-2.1" stroke="white" strokeWidth="3.2" strokeLinecap="round"/>
        <path d="M5 26c5.2 0 7-8.2 11.3-8.2 3.1 0 4.2 3.1 10.7 3.1" stroke="white" strokeOpacity=".8" strokeWidth="3.2" strokeLinecap="round"/>
      </svg>
    </span>
    <span className="font-display text-xl font-extrabold tracking-[-.05em] text-text-primary">Social<span className="text-accent">Flow</span></span>
  </div>
}
