import Ellipsis from '@/components/ellipsis';
import Table from '@/components/table/table';
import { ColumnDefinitionType } from '@/components/table/types';
import { LinkDoc } from '@/models/link';
import Head from 'next/head';
import Link from 'next/link';
import useSWR from 'swr';

const columns: ColumnDefinitionType<LinkDoc>[] = [
  {
    key: 'shortLink',
    header: 'go/Link',
    render: link => <Link href={`/${link.shortLink}`}>
      go/{link.shortLink}
    </Link>,
  },
  {
    key: 'shortLink',
    header: 'Copy',
    render: item => 'copy',
  },
  {
    key: 'fullLink',
    header: 'Target',
    render: link => 
      <Ellipsis maxWidth='50vh'>
        <Link href={`/${link.shortLink}`}>
          {link.fullLink}
        </Link>
      </Ellipsis>
  },
  {
    key: 'shortLink',
    header: 'Edit',
    render: link => <Link href={`/${link.shortLink}/edit`}>
      Edit
    </Link>,
  },
  {
    key: 'shortLink',
    header: 'Views',
    render: item => '0 views',
  },
  {
    key: 'shortLink',
    header: 'Last Access',
    render: item => 'Today',
  },
];


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
      <main style={{display: 'flex'}}>
        <Table data={data?.data ?? []} columns={columns} />
      </main>
    </>
  )
};
