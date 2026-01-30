"use client"

import { usePathname } from "next/navigation"

export default function Main({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHome = pathname === '/'
  return (
    <main className={isHome ? "" : "pt-25"}>
      {children}
    </main>
  )
}