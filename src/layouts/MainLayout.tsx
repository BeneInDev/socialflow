import type { ReactNode } from 'react'

type MainLayoutProps = {
  children: ReactNode
}

/**
 * Casca de página compartilhada: centraliza o conteúdo em uma coluna de
 * leitura confortável e garante o respiro mínimo em telas pequenas.
 * Quando houver navegação/autenticação, o header e o footer entram aqui.
 */
export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-dvh bg-paper">
      <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 py-10 sm:max-w-lg sm:py-16">
        {children}
      </div>
    </div>
  )
}
