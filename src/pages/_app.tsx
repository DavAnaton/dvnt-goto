import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'


export default function App({ Component, pageProps }: AppProps) {
  return <SWRConfig value={{
    fetcher: (url, params) => fetch(url, params).then(res => res.json()),

  }}>
    <Component {...pageProps} />
  </SWRConfig>;
}
