import "@/styles/globals.css"

import { SiteHeader } from '@/components/ui/site-header'
import { ThemeProvider } from '@/components/ui/theme-provider'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
    >
      <SiteHeader />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
