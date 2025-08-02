import type React from "react"
import type { Metadata } from "next"
import { Orbitron, Exo_2, Space_Grotesk } from "next/font/google"
import "./globals.css"

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "700", "900"],
})

const exo = Exo_2({
  subsets: ["latin"],
  variable: "--font-exo",
  weight: ["300", "400", "600", "700"],
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["300", "400", "500", "700"],
})

export const metadata: Metadata = {
  title: "RAGE - Artist Portfolio",
  description: "Ultra-modern music artist portfolio with stunning visuals",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${orbitron.variable} ${exo.variable} ${spaceGrotesk.variable} font-space`}>{children}</body>
    </html>
  )
}
