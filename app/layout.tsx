import { Manrope, Quicksand } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import Header from "@/components/layout/Header"
import { buildMetadata, siteConfig } from "@/lib/seo"
import Head from "next/head"

const manropeHeading = Manrope({
  subsets: ["latin"],
  variable: "--font-heading",
})
const quicksandFont = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
})

export const metadata = buildMetadata({
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
})
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        manropeHeading.variable,
        quicksandFont.variable
      )}
    >
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className={quicksandFont.className}>
        <ThemeProvider>
          <Header />
          {children}
          {/* <Footer /> */}
        </ThemeProvider>
      </body>
    </html>
  )
}
