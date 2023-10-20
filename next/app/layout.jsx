import Navbar from '@/components/Navbar'
import './globals.css'

export const metadata = {
  title: 'Swole',
  description: 'Swole App',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Navbar />
        {children}
        </body>
    </html>
  )
}
