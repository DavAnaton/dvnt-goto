import Layout from '@/components/layout';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'


export default function App({ Component, pageProps }: AppProps) {
  return <SWRConfig value={{
    fetcher: (url, params) => fetch(url, params).then(res => res.json()),

  }}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </SWRConfig>;
}
