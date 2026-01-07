import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/components/AuthProvider'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Karaoke Plus - 互動式 KTV 平台',
  description: '具備歌詞同步功能的互動式 KTV 平台',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <AuthProvider>
          <Navbar />
          <main className="main-content" style={{ marginTop: 'var(--header-height)' }}>
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}
