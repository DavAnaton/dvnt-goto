import { LinkDoc } from '@/models/link';
// import styles from '@/styles/Home.module.css';
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
      <main>
        {data?.data?.map((link: LinkDoc) => <div key={link._id}>
          <Link href={`/${link.shortLink}`}>
            go/{link.shortLink}
          </Link>
          <p>Copy</p>
          <Link href={`/${link.shortLink}`}>
            {link.fullLink.slice(0, 30)}...
          </Link>
          <Link href={`/${link.shortLink}/edit`}>
            Edit
          </Link>
          <p>0 views</p>
          <p>Last Access: Today</p>
          <br/>
        </div>)}
      </main>
    </>
  )
}

