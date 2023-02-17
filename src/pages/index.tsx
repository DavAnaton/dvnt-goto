import { LinkDoc } from '@/models/link';
import styles from '@/styles/Home.module.css';
import Head from 'next/head';
import Link from 'next/link';
import useSWR from 'swr';

export default function Home() {
  const { data } = useSWR('/api/links');
  return (
    <>
      <Head>
        <title>List links</title>
        <meta name="description" content="Shortlinking App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {data?.data?.map((link: LinkDoc) => <div>
          <Link href={`/${link.shortLink}/edit`}>
            go/{link.shortLink}
          </Link>
          <Link href={`/${link.shortLink}`}>
            -&gt;
          </Link>
        </div>)}
      </main>
    </>
  )
}

