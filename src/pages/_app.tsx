import Layout from '@/components/layout';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import { SessionProvider } from "next-auth/react"


export default function App({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  return <SWRConfig value={{
    fetcher: (url, params) => fetch(url, params).then(res => res.json()),

  }}>    
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  </SWRConfig>;
}
