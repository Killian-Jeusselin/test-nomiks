import './globals.css'
import { Inter } from 'next/font/google'
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
//core
import "primereact/resources/primereact.min.css";
import '/node_modules/primeflex/primeflex.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Sigmoid function',
  description: 'Nomiks Test app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
