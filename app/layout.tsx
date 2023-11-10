import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import InfoBar from "@/components/InfoBar";
import { ReduxProvider } from "@/redux/provider";
import './globals.css'

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
  title: 'Crypto App',
  description: 'Crypto App',
}

const RootLayout = ({children}: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <ReduxProvider>
            <InfoBar />
            {children}
          </ReduxProvider>
        </main>
      </body>
    </html>
  )
}

export default RootLayout;
