import type { ReactNode } from 'react'

export function MainLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-dvh overflow-x-hidden bg-background">{children}</div>
}
