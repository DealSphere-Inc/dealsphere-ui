'use client'

import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

import { AuthProvider } from '@/contexts/auth-context'
import { FundProvider } from '@/contexts/fund-context'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <AuthProvider>
          <FundProvider>
            {children}
          </FundProvider>
        </AuthProvider>
      </NextThemesProvider>
    </NextUIProvider>
  )
}
