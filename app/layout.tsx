import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {Alert} from "@/app/_components";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
  title: 'Exomemory Dashboard',
  description: 'Nostalgia gateway.',
}

export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
    <html lang="zh-cn">
    <body className={inter.className}>
    <Alert/>
    {children}
    </body>
    </html>
  )
}
